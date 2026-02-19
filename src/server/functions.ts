import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';
import { projects, categories, showcaseProjects } from '../data/projects';
import { techCategories } from '../data/stack';
import { skills } from '../data/skills';
import { contactSchema } from '../schemas/contact';

const contactTo = process.env.CONTACT_TO_EMAIL ?? 'job@azaelac.dev';
const contactFrom =
  process.env.RESEND_FROM ?? 'Portfolio Contact <onboarding@resend.dev>';

export const getProjects = createServerFn({ method: 'GET' }).handler(
  async () => {
    return projects;
  },
);

export const getCategories = createServerFn({ method: 'GET' }).handler(
  async () => {
    return categories;
  },
);

export const getShowcaseProjects = createServerFn({ method: 'GET' }).handler(
  async () => {
    return showcaseProjects;
  },
);

export const getProjectById = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    const project = projects.find((p) => p.id === data.id) ?? null;
    return project;
  });

export const getStack = createServerFn({ method: 'GET' }).handler(async () => {
  return techCategories;
});

export const getSkills = createServerFn({ method: 'GET' }).handler(async () => {
  return skills;
});

export const sendContactEmail = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => {
    const payload = input as { data?: unknown };
    return contactSchema.parse(payload?.data ?? input);
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      throw new Error(
        'RESEND_API_KEY is not set. Add it to .env (local) or to your hosting dashboard (e.g. Vercel/Netlify) for production.',
      );
    }
    const resend = new Resend(apiKey);
    const { data: emailData, error } = await resend.emails.send({
      from: contactFrom,
      to: contactTo,
      replyTo: data.email,
      subject: `Contact form: ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    });
    if (error) {
      const msg =
        error.message?.toLowerCase().includes('invalid')
          ? `${error.message} Check the key at https://resend.com/api-keys and set RESEND_API_KEY in your environment.`
          : error.message;
      throw new Error(msg);
    }
    return { ok: true, id: emailData?.id };
  });

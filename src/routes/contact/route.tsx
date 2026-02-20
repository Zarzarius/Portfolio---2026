import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../components/Button';
import { profile } from '../../data/profile';
import { sendContactEmail } from '../../server/functions';
import { contactSchema, type ContactFormData } from '../../schemas/contact';
import styles from './contact.module.scss';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus('submitting');
    try {
      await sendContactEmail({ data: result.data });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setFormError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again or email directly.',
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={clsx(styles.container)}>
      <h1 className={clsx(styles.title)}>Get in touch</h1>
      <p className={clsx(styles.intro)}>
        Based in {profile.location}. Open to new projects and collaborations.
      </p>

      <div className={clsx(styles.contactDetails)}>
        <a
          href={`mailto:${profile.email}`}
          className={clsx(styles.contactLink)}
        >
          {profile.email}
        </a>
        <a
          href={`tel:${profile.phone.replace(/\s/g, '')}`}
          className={clsx(styles.contactLink)}
        >
          {profile.phone}
        </a>
        <p className={clsx(styles.contactLine)}>{profile.address}</p>
      </div>

      <form className={clsx(styles.form)} onSubmit={handleSubmit}>
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="name" className={clsx(styles.label)}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={clsx(styles.input, errors.name && styles.inputError)}
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className={clsx(styles.fieldError)} role="alert">
              {errors.name}
            </span>
          )}
        </div>
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="email" className={clsx(styles.label)}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={clsx(styles.input, errors.email && styles.inputError)}
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className={clsx(styles.fieldError)} role="alert">
              {errors.email}
            </span>
          )}
        </div>
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="message" className={clsx(styles.label)}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className={clsx(styles.textarea, errors.message && styles.inputError)}
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className={clsx(styles.fieldError)} role="alert">
              {errors.message}
            </span>
          )}
        </div>
        {status === 'success' && (
          <p className={clsx(styles.formFeedback, styles.formSuccess)}>
            Thanks! Your message has been sent.
          </p>
        )}
        {status === 'error' && formError && (
          <p className={clsx(styles.formFeedback, styles.formError)} role="alert">
            {formError}
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
          loading={status === 'submitting'}
        >
          Send message
        </Button>
      </form>

      <div className={clsx(styles.socialSection)}>
        <h2 className={clsx(styles.socialTitle)}>Elsewhere</h2>
        <div className={clsx(styles.socialLinks)}>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.socialLink)}
          >
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.socialLink)}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

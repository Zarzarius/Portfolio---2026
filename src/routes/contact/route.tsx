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
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

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
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email directly.',
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

  const mapsQuery = encodeURIComponent(profile.address);

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.hero)}>
        <h1 className={clsx(styles.title)}>Get in touch</h1>
        <p className={clsx(styles.intro)}>
          Based in {profile.location}. Open to new projects and collaborations.
        </p>

        <div className={clsx(styles.contactBlock)}>
          <div className={clsx(styles.contactItem)}>
            <span className={clsx(styles.contactLabel)}>Email</span>
            <a
              href={`mailto:${profile.email}`}
              className={clsx(styles.contactLink)}
            >
              {profile.email}
            </a>
          </div>
          <div className={clsx(styles.contactItem)}>
            <span className={clsx(styles.contactLabel)}>Social</span>
            <div className={clsx(styles.socialLinks)}>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(styles.socialLink)}
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={styles.socialLinkIcon}
                  aria-hidden
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href={
                  profile.social.linkedin.startsWith('http')
                    ? profile.social.linkedin
                    : `https://${profile.social.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(styles.socialLink)}
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={styles.socialLinkIcon}
                  aria-hidden
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
          <div className={clsx(styles.contactItem)}>
            <span className={clsx(styles.contactLabel)}>Phone</span>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className={clsx(styles.contactLink)}
            >
              {profile.phone}
            </a>
          </div>
          <div className={clsx(styles.contactItem)}>
            <span className={clsx(styles.contactLabel)}>Location</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(styles.contactLink, styles.contactLinkMuted)}
            >
              {profile.address}
            </a>
          </div>
        </div>
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
            <span
              id="name-error"
              className={clsx(styles.fieldError)}
              role="alert"
            >
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
            <span
              id="email-error"
              className={clsx(styles.fieldError)}
              role="alert"
            >
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
            className={clsx(
              styles.textarea,
              errors.message && styles.inputError,
            )}
            placeholder="Your message…"
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span
              id="message-error"
              className={clsx(styles.fieldError)}
              role="alert"
            >
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
          <p
            className={clsx(styles.formFeedback, styles.formError)}
            role="alert"
          >
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
    </div>
  );
}

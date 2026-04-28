import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Button } from '@/components/Button';
import { SocialLinks } from '@/components/SocialLinks';
import { getProfile } from '@/data/profile';
import { getDefaultSeoMeta } from '@/data/seo';
import { normalizeLocale } from '@/i18n';
import { useMessages } from '@/i18n/useMessages';
import { sendContactEmail } from '@/server/functions';
import { createContactSchema, type ContactFormData } from '@/schemas/contact';
import styles from '../../contact/contact.module.scss';

const cx = classNames.bind(styles);

export const Route = createFileRoute('/$locale/contact')({
  head: ({ params }) => {
    const seo = getDefaultSeoMeta({
      locale: params.locale,
      path: `/${params.locale}/contact`,
      pathnameWithoutLocale: '/contact',
    });
    return { meta: seo.meta, links: seo.links, scripts: seo.scripts };
  },
  component: Contact,
});

function Contact() {
  const { locale } = Route.useParams();
  const t = useMessages();
  const profile = getProfile(normalizeLocale(locale));
  const contactSchema = createContactSchema(t.contact.validation);

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
      setFormError(err instanceof Error ? err.message : t.contact.defaultError);
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
    <div className={cx('container')}>
      <div className={cx('hero')}>
        <h1 className={cx('title')}>{t.contact.title}</h1>
        <p className={cx('intro')}>
          {t.common.basedIn} {profile.location}. {t.contact.intro}
        </p>

        <div className={cx('contactBlock')}>
          <div className={cx('contactItem')}>
            <span className={cx('contactLabel')}>{t.contact.email}</span>
            <a href={`mailto:${profile.email}`} className={cx('contactLink')}>
              {profile.email}
            </a>
          </div>
          <div className={cx('contactItem')}>
            <span className={cx('contactLabel')}>{t.contact.social}</span>
            <SocialLinks
              githubUrl={profile.social.github}
              linkedinUrl={profile.social.linkedin}
              className={cx('socialLinks')}
              linkClassName={cx('socialLink')}
              iconClassName={cx('socialLinkIcon')}
            />
          </div>
          <div className={cx('contactItem')}>
            <span className={cx('contactLabel')}>{t.contact.phone}</span>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className={cx('contactLink')}
            >
              {profile.phone}
            </a>
          </div>
        </div>
      </div>

      <form className={cx('form')} onSubmit={handleSubmit}>
        <h2 className={cx('formHeadline')}>{t.contact.sendMessage}</h2>
        <div className={cx('formGroup')}>
          <label htmlFor="name" className={cx('label')}>
            {t.contact.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={cx('input', errors.name && 'inputError')}
            placeholder={t.contact.yourName}
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className={cx('fieldError')} role="alert">
              {errors.name}
            </span>
          )}
        </div>
        <div className={cx('formGroup')}>
          <label htmlFor="email" className={cx('label')}>
            {t.contact.emailField}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={cx('input', errors.email && 'inputError')}
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className={cx('fieldError')} role="alert">
              {errors.email}
            </span>
          )}
        </div>
        <div className={cx('formGroup')}>
          <label htmlFor="message" className={cx('label')}>
            {t.contact.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className={cx('textarea', errors.message && 'inputError')}
            placeholder={t.contact.yourMessage}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className={cx('fieldError')} role="alert">
              {errors.message}
            </span>
          )}
        </div>
        {status === 'success' && (
          <p className={cx('formFeedback', 'formSuccess')}>
            {t.contact.success}
          </p>
        )}
        {status === 'error' && formError && (
          <p className={cx('formFeedback', 'formError')} role="alert">
            {formError}
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
          loading={status === 'submitting'}
          loadingText={t.common.loading}
        >
          {t.contact.sendButton}
        </Button>
      </form>
    </div>
  );
}

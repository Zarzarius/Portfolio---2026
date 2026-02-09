import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import { profile } from '../../data/profile';
import styles from './contact.module.scss';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  return (
    <div className={clsx(styles.container)}>
      <h1 className={clsx(styles.title)}>Get in touch</h1>
      <p className={clsx(styles.intro)}>
        Based in {profile.location}. Open to new projects and collaborations.
      </p>

      <div className={clsx(styles.contactDetails)}>
        <a href={`mailto:${profile.email}`} className={clsx(styles.contactLink)}>
          {profile.email}
        </a>
        <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className={clsx(styles.contactLink)}>
          {profile.phone}
        </a>
        <p className={clsx(styles.contactLine)}>{profile.address}</p>
      </div>

      <form className={clsx(styles.form)}>
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="name" className={clsx(styles.label)}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={clsx(styles.input)}
            placeholder="Your name"
          />
        </div>
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="email" className={clsx(styles.label)}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={clsx(styles.input)}
            placeholder="you@example.com"
          />
        </div>
        <div className={clsx(styles.formGroup)}>
          <label htmlFor="message" className={clsx(styles.label)}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className={clsx(styles.textarea)}
            placeholder="Your message..."
          />
        </div>
        <button type="submit" className={clsx(styles.submitButton)}>
          Send message
        </button>
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

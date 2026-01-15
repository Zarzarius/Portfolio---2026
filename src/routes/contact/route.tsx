import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import styles from './contact.module.scss'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <div className={clsx(styles.container)}>
      <h1 className={clsx(styles.title)}>Get in Touch</h1>
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
            placeholder="your.email@example.com"
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
            placeholder="Your message here..."
          />
        </div>
        <button type="submit" className={clsx(styles.submitButton)}>
          Send Message
        </button>
      </form>
      <div className={clsx(styles.socialSection)}>
        <h2 className={clsx(styles.socialTitle)}>Connect with me</h2>
        <div className={clsx(styles.socialLinks)}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.socialLink)}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.socialLink)}
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.socialLink)}
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  )
}

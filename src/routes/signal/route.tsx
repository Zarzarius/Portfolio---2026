import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../components/Button';
import styles from './signal.module.scss';

export const Route = createFileRoute('/signal')({
  component: Signal,
});

function Signal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={clsx(styles.page)}>
      <header className={clsx(styles.header)}>
        <p className={clsx(styles.eyebrow)}>Get in touch</p>
        <h1 className={clsx(styles.title)}>Contact</h1>
        <p className={clsx(styles.subtitle)}>
          Have a project in mind or want to collaborate? Send a message and I’ll
          get back to you.
        </p>
      </header>

      <div className={clsx(styles.layout)}>
        <div className={clsx(styles.info)}>
          <h2 className={clsx(styles.infoTitle)}>Reach out</h2>
          <p className={clsx(styles.infoText)}>
            Open to new projects and long-term collaborations. I typically reply
            within 24 hours.
          </p>
          <dl className={clsx(styles.details)}>
            <div className={clsx(styles.detail)}>
              <dt>Email</dt>
              <dd>azaelalonsocampana@gmail.com</dd>
            </div>
            <div className={clsx(styles.detail)}>
              <dt>Availability</dt>
              <dd>Available for new work</dd>
            </div>
          </dl>
        </div>

        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
          <div className={clsx(styles.field)}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={clsx(styles.input)}
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
          <div className={clsx(styles.field)}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={clsx(styles.input)}
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <div className={clsx(styles.field)}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className={clsx(styles.textarea)}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
            />
          </div>
          <Button type="submit" variant="primary">
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
}

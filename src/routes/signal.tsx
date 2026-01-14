import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
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
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titlePrefix}>04//</div>
        <h1 className={styles.title}>SIGNAL_TRANSMISSION</h1>
        <div className={styles.commandLine}>
          &gt; open_secure_channel --protocol=encrypted --mode=contact
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>ESTABLISH_CONNECTION</h2>
          <p className={styles.infoDescription}>
            Ready to collaborate on your next high-tech project. Open for new
            architectural challenges and complex system integrations. Let's
            build the future together.
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>EMAIL:</span>
              <span className={styles.contactValue}>
                azaelalonsocampana@gmail.com
              </span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>STATUS:</span>
              <span className={styles.contactValue}>AVAILABLE</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>RESPONSE_TIME:</span>
              <span className={styles.contactValue}>&lt; 24 HOURS</span>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              &gt; NAME:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              &gt; EMAIL:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              &gt; MESSAGE:
            </label>
            <textarea
              id="message"
              name="message"
              rows={8}
              className={styles.textarea}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your project or inquiry..."
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            SEND_TRANSMISSION &gt;
          </button>
        </form>
      </div>
    </div>
  );
}

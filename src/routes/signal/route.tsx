import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import clsx from 'clsx';
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
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)}>
        <div className={clsx(styles.titlePrefix)}>04//</div>
        <h1 className={clsx(styles.title)}>SIGNAL_TRANSMISSION</h1>
        <div className={clsx(styles.commandLine)}>
          &gt; open_secure_channel --protocol=encrypted --mode=contact
        </div>
      </div>

      <div className={clsx(styles.content)}>
        <div className={clsx(styles.infoSection)}>
          <h2 className={clsx(styles.infoTitle)}>ESTABLISH_CONNECTION</h2>
          <p className={clsx(styles.infoDescription)}>
            Ready to collaborate on your next high-tech project. Open for new
            architectural challenges and complex system integrations. Let's
            build the future together.
          </p>
          <div className={clsx(styles.contactInfo)}>
            <div className={clsx(styles.contactItem)}>
              <span className={clsx(styles.contactLabel)}>EMAIL:</span>
              <span className={clsx(styles.contactValue)}>
                azaelalonsocampana@gmail.com
              </span>
            </div>
            <div className={clsx(styles.contactItem)}>
              <span className={clsx(styles.contactLabel)}>STATUS:</span>
              <span className={clsx(styles.contactValue)}>AVAILABLE</span>
            </div>
            <div className={clsx(styles.contactItem)}>
              <span className={clsx(styles.contactLabel)}>RESPONSE_TIME:</span>
              <span className={clsx(styles.contactValue)}>&lt; 24 HOURS</span>
            </div>
          </div>
        </div>

        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
          <div className={clsx(styles.formGroup)}>
            <label htmlFor="name" className={clsx(styles.label)}>
              &gt; NAME:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={clsx(styles.input)}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className={clsx(styles.formGroup)}>
            <label htmlFor="email" className={clsx(styles.label)}>
              &gt; EMAIL:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={clsx(styles.input)}
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
          </div>
          <div className={clsx(styles.formGroup)}>
            <label htmlFor="message" className={clsx(styles.label)}>
              &gt; MESSAGE:
            </label>
            <textarea
              id="message"
              name="message"
              rows={8}
              className={clsx(styles.textarea)}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your project or inquiry..."
            />
          </div>
          <button type="submit" className={clsx(styles.submitButton)}>
            SEND_TRANSMISSION &gt;
          </button>
        </form>
      </div>
    </div>
  );
}

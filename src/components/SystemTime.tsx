import { useEffect, useState } from 'react';

export function SystemTime() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same structure but empty values to avoid layout shift if possible,
    // though here a null or a simple string is fine as it's a small part of the footer.
    return <span>* AT: --/--/-- | --:-- | 74.000^</span>;
  }

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });

  const timeStr = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      * AT: {dateStr} | {timeStr} | 74.000^
    </>
  );
}

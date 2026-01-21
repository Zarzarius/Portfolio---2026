import { StartClient } from '@tanstack/react-start/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// For static builds, render into body
// RootDocument will only render children (not full HTML structure)
const rootElement = document.body;

createRoot(rootElement).render(
  <StrictMode>
    <StartClient />
  </StrictMode>
);

import { StartClient } from '@tanstack/react-start/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Render into body - StartClient with RootDocument will handle the document structure
createRoot(document.body).render(
  <StrictMode>
    <StartClient />
  </StrictMode>
);

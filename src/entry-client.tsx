import { StartClient } from '@tanstack/react-start';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>
);

import { createServerEntry } from '@tanstack/react-start/server';
import { getRouter } from './router';

const handler = createServerEntry({
  getRouter,
});

export default handler;

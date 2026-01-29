import { createServerEntry } from '@tanstack/react-start/server';
import { getRouter } from './router';

export default createServerEntry({
  getRouter,
});

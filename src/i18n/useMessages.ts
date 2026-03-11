import { getMessages } from './index';
import type { Messages } from './types';
import { useCurrentLocale } from './useLocale';

export function useMessages(): Messages {
  const locale = useCurrentLocale();
  return getMessages(locale);
}


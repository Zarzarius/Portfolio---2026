import { getMessages } from './index';
import { useCurrentLocale } from './useLocale';

export function useMessages() {
  const locale = useCurrentLocale();
  return getMessages(locale);
}


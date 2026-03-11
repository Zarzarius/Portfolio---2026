import { z } from 'zod';
import type { Messages } from '@/i18n/types';
import { enMessages } from '@/i18n/messages/en';

export function createContactSchema(
  validation: Messages['contact']['validation'],
) {
  return z.object({
    name: z
      .string()
      .min(1, validation.nameRequired)
      .max(100, validation.nameTooLong),
    email: z
      .string()
      .min(1, validation.emailRequired)
      .email(validation.emailInvalid),
    message: z
      .string()
      .min(10, validation.messageMin)
      .max(2000, validation.messageTooLong),
  });
}

export const contactSchema = createContactSchema(enMessages.contact.validation);

export type ContactFormData = z.infer<typeof contactSchema>;

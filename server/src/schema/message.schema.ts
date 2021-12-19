import { object, string } from 'yup';

export const createMessageSchema = object({
  body: object({
    message: string().required('Message is required'),
  }),
});

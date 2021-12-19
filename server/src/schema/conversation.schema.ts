import { object, string } from 'yup';

export const createConversationSchema = object({
  body: object({
    participant: string().required('Participant is required'),
  }),
});

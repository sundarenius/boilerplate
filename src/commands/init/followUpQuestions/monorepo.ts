import { QuestionsAndAnswers } from '@/types/types';

export const monorepo:() => QuestionsAndAnswers[] = () => ([
  {
    type: 'confirm',
    name: 'monorepo',
    message: 'Do you need monorepo?',
    default: true,
  },
]);

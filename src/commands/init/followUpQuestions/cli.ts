import { QuestionsAndAnswers } from '@/types/types';

export const cli:() => QuestionsAndAnswers[] = () => ([
  {
    type: 'confirm',
    name: 'cli',
    message: 'Do you need cli?',
    default: true,
  },
]);

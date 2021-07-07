import { QuestionsAndAnswers } from '@/types/types';

export const frontendApi:() => QuestionsAndAnswers[] = () => ([
  {
    type: 'confirm',
    name: 'frontendApi',
    message: 'Do you need frontend api?',
    default: true,
  },
]);

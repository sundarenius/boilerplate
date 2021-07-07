import { QuestionsAndAnswers } from '@/types/types';

export const frontend:(type:string) => QuestionsAndAnswers[] = (type) => ([
  {
    type: 'list',
    name: 'type',
    message: `Is not ${type} just awesome?`,
    choices: ['yes', 'no'],
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: 'type',
    message: `You want a SPA or SSR ${type} app?`,
    choices: ['SPA', 'SSR'],
    filter(val: any) {
      return val.toLowerCase();
    },
  },
]);

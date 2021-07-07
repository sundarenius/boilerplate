import { QuestionsAndAnswers } from '@/types/types';
import { terminalQandA } from '@/utils/helpers';

export const frontend:(type:string) => QuestionsAndAnswers[] = (type) => ([
  {
    type: 'list',
    name: 'appType',
    message: `You want a SPA or SSR ${type} app?`,
    choices: ['SPA', 'SSR'],
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: 'routing',
    message: 'Do you need routing?',
    default: true,
  },
  {
    type: 'list',
    name: 'language',
    message: 'Select language',
    choices: ['JavaScript', 'TypeScript'],
    filter(val: any) {
      return val.toLowerCase();
    },
  },
]);

type AdditionalFrontEndQuestions = (followUpAnswers: Record<string, any>) => Promise<Record<string, any>>
export const additionalFrontEndQuestions: AdditionalFrontEndQuestions = async (followUpAnswers) => {
  let additionalAnswers = {
    ...followUpAnswers,
  };

  if (followUpAnswers.routing) {
    const res = await terminalQandA([
      {
        type: 'list',
        name: 'routingType',
        message: 'Router with hash or history mode(history needs server configurations)',
        choices: ['Hash', 'History'],
        filter(val: any) {
          return val.toLowerCase();
        },
      },
    ]);
    additionalAnswers = {
      ...additionalAnswers,
      ...res,
    };
  }

  return additionalAnswers;
};

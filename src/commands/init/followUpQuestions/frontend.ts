import { QuestionsAndAnswers } from '@/types/types';
import { terminalQandA } from '@/utils/helpers';

/*
 * Questions for frontend:
 * 1. appType(spa/ssr)
 * 2. language
 * 3. routing (if SPA, if SSR it's there's need to ask)
 * 4. eslint
 */

enum AppTypes {
  SPA = 'SPA',
  SSR = 'SSR'
}

enum Languages {
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript'
}

export const frontend:(type:string) => QuestionsAndAnswers[] = (type) => ([
  {
    type: 'list',
    name: 'appType',
    message: `You want a SPA or SSR ${type} app?`,
    choices: Object.values(AppTypes),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: 'language',
    message: 'Select language',
    choices: Object.values(Languages),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: 'eslint',
    message: 'Wanna use eslint?',
    default: true,
  },
]);

type AdditionalFrontEndQuestions = (followUpAnswers: Record<string, any>) => Promise<Record<string, any>>
export const additionalFrontEndQuestions: AdditionalFrontEndQuestions = async (followUpAnswers) => {
  let additionalAnswers = {
    ...followUpAnswers,
  };

  if (followUpAnswers.appType.toLowerCase() === AppTypes.SPA.toLowerCase()) {
    const res = await terminalQandA([
      {
        type: 'confirm',
        name: 'routing',
        message: 'Wanna use routing for your SPA?',
        choices: ['Hash', 'History'],
        default: true,
      },
    ]);
    additionalAnswers = {
      ...additionalAnswers,
      ...res,
    };
    if (res.routing) {
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
  }

  if (followUpAnswers.eslint) {
    const res = await terminalQandA([
      {
        type: 'list',
        name: 'eslintType',
        message: 'What type of eslint style do you wanna use?',
        choices: ['Airbnb', 'Standard'],
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

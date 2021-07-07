import { QuestionsAndAnswers } from '@/types/types';
import { terminalQandA } from '@/utils/helpers';
import inquirer from 'inquirer';

/*
 * Questions for frontend:
 * 1. appType(spa/ssr)
 * 2. language
 * 3. routing (if SPA, if SSR then there's no need to ask)
 * 4. eslint
 */

// Move all types into types/frontend

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
    message: 'Wanna use a linter (eslint)?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'stateManagement',
    message: 'Do you need global state management?',
    default: true,
  },
  {
    type: 'list',
    name: 'language',
    message: 'Pick a CSS pre-processor',
    choices: ['Sass/SCSS', 'Less', 'Stylus', 'none'],
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'checkbox',
    message: 'Testing (optional) ',
    name: 'testing',
    choices: [
      new inquirer.Separator(' = Select with spacebar, finish with enter = '),
      {
        name: 'Unit (jest)',
      },
      {
        name: 'E2E (cypress)',
      },
    ],
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
          type: 'confirm',
          name: 'historyRouter',
          // eslint-disable-next-line max-len
          message: 'Use history mode for router? (Requires proper server setup for index fallback in production)',
          default: true,
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

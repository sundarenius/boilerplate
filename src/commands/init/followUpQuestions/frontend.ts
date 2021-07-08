import { QuestionsAndAnswers } from '@/types/types';
import {
  AppTypes,
  Languages,
  CssPreProcessor,
  Testing,
  ESLint,
  NameOptions,
} from '@/types/frontend-types';
import { terminalQandA, getFrameWorkOptions } from '@/utils/helpers';
import inquirer from 'inquirer';

/*
 * Questions for frontend:
 * 1. appType(spa/ssr)
 * 2. language
 * 3. routing (if SPA, if SSR then there's no need to ask)
 * 4. eslint
 * 5. State management
 * 6. Css preprocessor
 * 7. Testing tools (unit/e2e)
 */

export const frontend:(type:string) => QuestionsAndAnswers[] = (type) => ([
  {
    type: 'list',
    name: NameOptions.APP_TYPE,
    message: `You want a SPA or SSR ${type} app?`,
    choices: Object.values(AppTypes),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: NameOptions.LANGUAGE,
    message: 'Select language',
    choices: Object.values(Languages),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: NameOptions.ESLINT,
    message: 'Wanna use a linter (eslint)?',
    default: true,
  },
  {
    type: 'confirm',
    name: NameOptions.STATE_MANAGEMENT,
    message: 'Do you need global state management?',
    default: true,
  },
  {
    type: 'list',
    name: NameOptions.CSS_PROCESSOR,
    message: 'Pick a CSS pre-processor',
    choices: Object.values(CssPreProcessor),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: NameOptions.UI_FRAMEWORK,
    message: 'Pick a UI framework (if any)',
    choices: getFrameWorkOptions(type),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'checkbox',
    message: 'Testing (optional) ',
    name: NameOptions.TESTING,
    choices: [
      new inquirer.Separator(' = Select with spacebar, finish with enter = '),
      {
        name: Testing.UNIT,
      },
      {
        name: Testing.E2E,
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
        name: NameOptions.ROUTING,
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
          name: NameOptions.HISTORY_ROUTER,
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
        name: NameOptions.ESLINT_TYPE,
        message: 'What type of eslint style do you wanna use?',
        choices: Object.values(ESLint),
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

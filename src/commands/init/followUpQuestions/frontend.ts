import type { QuestionsAndAnswers } from '@/types/types';
import {
  AppTypes,
  Languages,
  CssPreProcessor,
  Testing,
  ESLint,
  UserFeedbackOptions,
  Themes,
  ComponentEnums,
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
 * 8. UI framework
 * 9. Docker
 */

export const frontend:(type:string) => QuestionsAndAnswers[] = (type) => ([
  {
    type: 'list',
    name: UserFeedbackOptions.APP_TYPE,
    message: `You want a SPA or SSR ${type} app?`,
    choices: Object.values(AppTypes),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: UserFeedbackOptions.LANGUAGE,
    message: 'Select language',
    choices: Object.values(Languages),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: UserFeedbackOptions.ESLINT_TYPE,
    message: 'What type of eslint style do you wanna use?',
    choices: Object.values(ESLint),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: UserFeedbackOptions.STATE_MANAGEMENT,
    message: 'Do you need global state management?',
    default: true,
  },
  {
    type: 'list',
    name: UserFeedbackOptions.CSS_PROCESSOR,
    message: 'Pick a CSS pre-processor',
    choices: Object.values(CssPreProcessor),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'list',
    name: UserFeedbackOptions.UI_FRAMEWORK,
    message: 'Pick a UI framework (if any)',
    choices: getFrameWorkOptions(type),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'checkbox',
    message: 'Testing (optional) ',
    name: UserFeedbackOptions.TESTING,
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
  {
    type: 'list',
    message: 'Pick a base theme',
    name: UserFeedbackOptions.THEME,
    choices: Object.values(Themes),
    filter(val: any) {
      return val.toLowerCase();
    },
  },
  {
    type: 'confirm',
    name: UserFeedbackOptions.INCLUDE_DOCKER,
    message: 'Do you wanna include docker?',
    default: true,
  },
  {
    type: 'confirm',
    name: UserFeedbackOptions.AUTH_REQUIRED,
    message: 'Should one be authenticated to use the app?',
    default: false,
  },
  {
    type: 'checkbox',
    message: 'Include base components for all views?',
    name: UserFeedbackOptions.BASE_COMPONENTS,
    choices: [
      // eslint-disable-next-line max-len
      new inquirer.Separator(' = Select with spacebar, finish with enter, or select none and click enter to skip = '),
      {
        name: ComponentEnums.MENU,
      },
      {
        name: ComponentEnums.FOOTER,
      },
      {
        name: ComponentEnums.SIDEBAR,
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
    const routingFeedback = await terminalQandA([
      {
        type: 'confirm',
        name: UserFeedbackOptions.ROUTING,
        message: 'Wanna use routing for your SPA?',
        default: true,
      },
    ]);
    additionalAnswers = {
      ...additionalAnswers,
      ...routingFeedback,
    };
    if (routingFeedback.routing) {
      const historyRouterFeedback = await terminalQandA([
        {
          type: 'confirm',
          name: UserFeedbackOptions.HISTORY_ROUTER,
          // eslint-disable-next-line max-len
          message: 'Use history mode for router? (Requires proper server setup for index fallback in production)',
          default: true,
        },
      ]);
      additionalAnswers = {
        ...additionalAnswers,
        ...historyRouterFeedback,
      };
    }
  }

  return additionalAnswers;
};

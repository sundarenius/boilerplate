import {
  createFile,
  createJsonOutPut,
  terminalQandA,
} from '@/utils/helpers';
import type { QuestionsAndAnswers } from '@/types/types';
import { JsonTemplateFileNames } from '@/types/types';
import {
  AppTypes,
  UserFeedbackOptions,
  Themes,
  DefaultProject,
} from '@/types/frontend-types';
import type { CompleteData, FrontendFrameworks } from '@/types/frontend-types';
import { build } from '@/commands/build/build';
import { additionalFrontEndQuestions } from './followUpQuestions/frontend';
import {
  initialState,
  initialRoute,
} from './initial-data';

const createTemplateFile = (fileName: string, feedback: QuestionsAndAnswers) => {
  createFile(`${fileName}.json`, createJsonOutPut(feedback));
};

const completeData = (data: Record<string, any>, appType:FrontendFrameworks):CompleteData => {
  const allData: CompleteData = {
    size: 'full', // 'full' | 600x200 # numbers translates to pixels
    framework: appType,
    theme: Themes.DARK_BLUE,
    ...data,
    canOverwriteApp: true,
  };

  // Check if we should include routes options
  if (data[UserFeedbackOptions.ROUTING] || (data[UserFeedbackOptions.APP_TYPE] === AppTypes.SSR)) {
    allData.routes = initialRoute();
  }

  if (data[UserFeedbackOptions.STATE_MANAGEMENT]) {
    allData.globalState = initialState();
  }

  return allData;
};

const createProjectQuestion = async (data: Record<string, any>) => {
  const { buildDefaultProject } = await terminalQandA([
    {
      type: 'confirm',
      name: 'buildDefaultProject',
      // eslint-disable-next-line max-len
      message: 'Great! I\'ve got some data from you. Can I create a default project? You can overwrite this later with your own configurations',
      default: false,
    },
  ]);
  createTemplateFile(JsonTemplateFileNames.BOILERPLATE_REACT, data);
  if (buildDefaultProject) {
    build(data, DefaultProject);
  }
};

export const initFrontend = async (
  followUpAnswers: Record<string, any>,
  appType: FrontendFrameworks,
) => {
  const additionalAnswers = await additionalFrontEndQuestions(followUpAnswers);
  const allData = completeData({
    ...followUpAnswers,
    ...additionalAnswers,
  },
  appType);
  createProjectQuestion(allData);
};

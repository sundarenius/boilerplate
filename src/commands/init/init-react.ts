import {
  createFile,
  createJsonOutPut,
} from '@/utils/helpers';
import type { QuestionsAndAnswers } from '@/types/types';
import { JsonTemplateFileNames, ProjectTypes } from '@/types/types';
import {
  AppTypes,
  // Languages,
  // CssPreProcessor,
  // Testing,
  // ESLint,
  NameOptions,
  Themes,
} from '@/types/frontend-types';
import type { CompleteData } from '@/types/frontend-types';
import { additionalFrontEndQuestions } from './followUpQuestions/frontend';
import {
  initialState,
  initialRoute,
} from './initial-data';

const createTemplateFile = (fileName: string, feedback: QuestionsAndAnswers) => {
  createFile(`${fileName}.json`, createJsonOutPut(feedback));
};

const completeData = (data: Record<string, any>):CompleteData => {
  const allData: CompleteData = {
    size: 'full', // 'full' | 600x200 # numbers translates to pixels
    framework: ProjectTypes.REACT,
    theme: Themes.DARK_BLUE,
    ...data,
    canOverWriteApp: true,
  };

  // Check if we should include routes options
  if (data[NameOptions.ROUTING] || (data[NameOptions.APP_TYPE] === AppTypes.SSR)) {
    allData.routes = initialRoute();
  }

  if (data[NameOptions.STATE_MANAGEMENT]) {
    allData.globalState = initialState();
  }

  return allData;
};

export const initReact = async (followUpAnswers: Record<string, any>) => {
  const additionalAnswers = await additionalFrontEndQuestions(followUpAnswers);
  const allData = completeData({
    ...followUpAnswers,
    ...additionalAnswers,
  });
  createTemplateFile(JsonTemplateFileNames.BOILERPLATE_REACT, allData);
};

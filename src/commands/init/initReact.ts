import {
  createFile,
  createJsonOutPut,
} from '@/utils/helpers';
import { QuestionsAndAnswers } from '@/types/types';
import {
  AppTypes,
  // Languages,
  // CssPreProcessor,
  // Testing,
  // ESLint,
  NameOptions,
} from '@/types/frontend-types';
import { additionalFrontEndQuestions } from './followUpQuestions/frontend';
import {
  initialState,
  initialRoute,
} from './initialData';

const createTemplateFile = (fileName: string, feedback: QuestionsAndAnswers) => {
  createFile(`${fileName}.json`, createJsonOutPut(feedback));
};

const completeData = (data: Record<string, any>) => {
  const allData = {
    ...data,
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
  createTemplateFile('boilerplate-react', allData);
};

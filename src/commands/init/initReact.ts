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
  RoutesData,
  NameOptions,
} from '@/types/frontend-types';
import { additionalFrontEndQuestions } from './followUpQuestions/frontend';

const createTemplateFile = (fileName: string, feedback: QuestionsAndAnswers) => {
  createFile(`${fileName}.json`, createJsonOutPut(feedback));
};

const completeData = (data: Record<string, any>) => {
  const allData = {
    ...data,
  };

  // Check if we should include routes options
  if (data[NameOptions.ROUTING] || (data[NameOptions.APP_TYPE] === AppTypes.SSR)) {
    const routes:Record<string, string|RoutesData> = {
      _info: 'It is good practice to name pages and components as PascalCase',
      routeOne: {
        name: 'RouteOne',
      },
      routeTwo: {
        name: 'RouteTwo',
      },
    };
    allData.routes = routes;
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

import {
// createFile,
// createJsonOutPut,
} from '@/utils/helpers';
import { additionalFrontEndQuestions } from './followUpQuestions/frontend';

export const initReact = async (followUpAnswers: Record<string, any>) => {
  const additionalAnswers = await additionalFrontEndQuestions(followUpAnswers);
  const allData = {
    ...followUpAnswers,
    ...additionalAnswers,
  };
  console.log(allData);
};

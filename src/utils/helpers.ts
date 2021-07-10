import fs from 'fs';
import inquirer from 'inquirer';
import type { QuestionsAndAnswers } from '@/types/types';
import { ProjectTypes } from '@/types/types';
import {
  ReactUiFrameWorks,
  VueUiFrameWorks,
} from '@/types/frontend-types';
import type {
  UserFeedbackOptions,
  CompleteData,
} from '@/types/frontend-types';

type TerminalQandA = (q: QuestionsAndAnswers[]) => QuestionsAndAnswers
export const terminalQandA: TerminalQandA = async (questions) => {
  const answers = await inquirer.prompt(questions);
  return answers;
};

export const createFile = (fileName: string, template: string) => {
  const ctxPath: string = process.cwd();
  fs.writeFile(`${ctxPath}/${fileName}`, template, (err: any) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log(`${fileName} saved!`);
  });
};

export const mkDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    } catch (err) {
      console.log('err occured');
    }
  }
};

export const createJsonOutPut = (input: Record<string, any>) => JSON.stringify(input, null, 2);

export const getFrameWorkOptions = (type: string):string[] => {
  switch (type) {
    case ProjectTypes.REACT:
    default:
      return Object.values(ReactUiFrameWorks);
    case ProjectTypes.VUE:
      return Object.values(VueUiFrameWorks);
  }
};

export const fileExists = (file:string) => {
  const dir = process.cwd();
  const fileFound = fs.existsSync(`${dir}/${file}`);
  return fileFound;
};

export const readJsonFile = (file: string) => {
  const dir = process.cwd();
  const bufferData = fs.readFileSync(`${dir}/${file}`);
  const stData = bufferData.toString();
  const data = JSON.parse(stData);
  return data;
};

type ArrIncludes = (
  opt: UserFeedbackOptions,
  data: Partial<CompleteData>,
  key: string,
) => boolean
export const arrIncludes:ArrIncludes = (opt, data, key) => {
  const arr = data[opt];
  if (Array.isArray(arr)) {
    return arr.includes(key as never);
  }
  return false;
};

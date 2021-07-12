import fs from 'fs';
import { promisify } from 'util';
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

export const createFile = async (fileName: string, template: string) => {
  try {
    const writeFileAsync = promisify(fs.writeFile);
    const ctxPath: string = process.cwd();
    const res = await writeFileAsync(`${ctxPath}/${fileName}`, template);
    return res;
  } catch (err) {
    console.log(err);
    console.log('Error at helper.ts -> createFile ', fileName);
    return null;
  }
};

export const mkDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    } catch (err) {
      console.log(err);
      console.log('Error at helper.ts -> mkDir');
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

export const equalStrings = (a:string, b:string): boolean =>
  a.toLowerCase() === b.toLowerCase();

export const semi = (airbnb: boolean) => (airbnb ? ';' : '');
export const comma = (airbnb: boolean) => (airbnb ? ',' : '');

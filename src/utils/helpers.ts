import fs from 'fs';
import inquirer from 'inquirer';
import { QuestionsAndAnswers } from '@/types/types';

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
    console.log(`${fileName} template saved!`);
  });
};

export const createJsonOutPut = (input: Record<string, any>) => JSON.stringify(input, null, 2);

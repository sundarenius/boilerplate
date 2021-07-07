import {
  terminalQuestions,
  createFile,
  createJsonOutPut,
} from '@/utils/helpers';
import { QuestionsAndAnswers, ProjectTypes } from '@/types/types';
import { frontend } from './followUpQuestions/frontend';

const projectTypes: ProjectTypes[] = Object.values(ProjectTypes);

const createTemplateFile = (fileName: string, feedback: QuestionsAndAnswers) => {
  createFile(`${fileName}.json`, createJsonOutPut(feedback));
};

const specificQuestions = () => ({
  [ProjectTypes.REACT]: () => frontend(ProjectTypes.REACT),
  [ProjectTypes.VUE]: () => frontend(ProjectTypes.VUE),
  [ProjectTypes.CLI]: () => console.log('CLI not available yet'),
  [ProjectTypes.FRONTEND_API]: () => console.log('Frontend api not available yet'),
  [ProjectTypes.MONOREPO]: () => console.log('Monorepo not available yet'),
});

const typeOfProject = (t: string) => {
  const type:ProjectTypes = projectTypes.filter((val: string) =>
    val.toLowerCase() === t.toLowerCase())[0];

  return specificQuestions()[type]();
};

export const init = async () => {
  console.log('Welcome to init function');

  const questions: QuestionsAndAnswers[] = [
    {
      type: 'list',
      name: 'type',
      message: 'What type of project do you wanna create?',
      choices: projectTypes,
      filter(val: any) {
        return val.toLowerCase();
      },
    },
  ];

  const { type } = await terminalQuestions(questions);
  console.log(`Great choice, will create a ${type} project for you`);
  console.log('Just a few more questions ...');
  const followUpQuestions = typeOfProject(type);
  console.log(followUpQuestions);
};

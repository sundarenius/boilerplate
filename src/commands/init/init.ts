import {
  terminalQuestions,
  createFile,
  createJsonOutPut,
} from '@/utils/helpers';
import { QuestionsAndAnswers, ProjectTypes } from '@/types/types';

const projectTypes: ProjectTypes[] = Object.values(ProjectTypes);

const createTemplateFile = (fileName: string, feedback: QuestionsAndAnswers) => {
  createFile(`${fileName}.json`, createJsonOutPut(feedback));
};

const specificQuestions = () => ({
  [ProjectTypes.REACT]: () => console.log('frontend specificQuestions'),
  [ProjectTypes.VUE]: () => console.log(specificQuestions()[ProjectTypes.REACT]()),
  [ProjectTypes.CLI]: () => console.log('CLI specificQuestions'),
  [ProjectTypes.FRONTEND_API]: () => console.log('frontend api specificQuestions'),
  [ProjectTypes.MONOREPO]: () => console.log('monorepo specificQuestions'),
});

const typeOfProject = (t: string) => {
  const type:ProjectTypes = projectTypes.filter((val: string) =>
    val.toLowerCase() === t.toLowerCase())[0];

  console.log(type);
  switch (type) {
    case ProjectTypes.REACT:
      return specificQuestions()[ProjectTypes.REACT]();
    case ProjectTypes.VUE:
      return specificQuestions()[ProjectTypes.VUE]();
    case ProjectTypes.CLI:
      return specificQuestions()[ProjectTypes.CLI]();
    case ProjectTypes.FRONTEND_API:
      return specificQuestions()[ProjectTypes.FRONTEND_API]();
    case ProjectTypes.MONOREPO:
      return specificQuestions()[ProjectTypes.MONOREPO]();
    default:
      return null;
  }
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

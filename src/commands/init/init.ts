import { terminalQandA } from '@/utils/helpers';
import { QuestionsAndAnswers, ProjectTypes } from '@/types/types';
import { frontend } from './followUpQuestions/frontend';
import { cli } from './followUpQuestions/cli';
import { frontendApi } from './followUpQuestions/frontendApi';
import { monorepo } from './followUpQuestions/monorepo';
import { initReact } from './initReact';

const projectTypes: ProjectTypes[] = Object.values(ProjectTypes);

const specificQuestions: () => Record<string, () => QuestionsAndAnswers[]> = () => ({
  [ProjectTypes.REACT]: () => frontend(ProjectTypes.REACT),
  [ProjectTypes.VUE]: () => frontend(ProjectTypes.VUE),
  [ProjectTypes.CLI]: () => cli(),
  [ProjectTypes.FRONTEND_API]: () => frontendApi(),
  [ProjectTypes.MONOREPO]: () => monorepo(),
});

const typeCaseInsesitive = (t: string): string => {
  const type:ProjectTypes = projectTypes.filter((val: string) =>
    val.toLowerCase() === t.toLowerCase())[0];
  return type;
};

const create = (type:string, followUpAnswers: Record<string, any>):void => {
  switch (type) {
    case ProjectTypes.REACT:
      initReact(followUpAnswers);
      break;
    case ProjectTypes.VUE:
      console.log(type);
      console.log('Sry you have to create one yourself, this is a todo.');
      break;
    case ProjectTypes.FRONTEND_API:
      console.log(type);
      console.log('Sry you have to create one yourself, this is a todo.');
      break;
    case ProjectTypes.CLI:
      console.log(type);
      console.log('Sry you have to create one yourself, this is a todo.');
      break;
    case ProjectTypes.MONOREPO:
      console.log(type);
      console.log('Sry you have to create one yourself, this is a todo.');
      break;
    default:
      break;
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

  const { type } = await terminalQandA(questions);
  console.log(`Great choice, will create a ${type} project for you`);
  console.log('Just a few more questions ...');

  const projectType:string = typeCaseInsesitive(type);
  const followUpQuestions:QuestionsAndAnswers[] = specificQuestions()[projectType]();
  const followUpAnswers = await terminalQandA(followUpQuestions);
  create(projectType, followUpAnswers);
};

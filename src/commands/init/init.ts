import { terminalQandA } from '@/utils/helpers';
import type { QuestionsAndAnswers } from '@/types/types';
import { ProjectTypes } from '@/types/types';
import { frontend } from './followUpQuestions/frontend';
import { cli } from './followUpQuestions/cli';
import { frontendApi } from './followUpQuestions/frontend-api';
import { monorepo } from './followUpQuestions/monorepo';
import { initFrontend } from './init-frontend';
import { initCli } from './init-cli';
import { initFrontApi } from './init-front-api';
import { initMonorepo } from './init-monorepo';

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
      initFrontend(followUpAnswers, ProjectTypes.REACT);
      break;
    case ProjectTypes.VUE:
      initFrontend(followUpAnswers, ProjectTypes.VUE);
      break;
    case ProjectTypes.FRONTEND_API:
      initFrontApi(followUpAnswers);
      break;
    case ProjectTypes.CLI:
      initCli(followUpAnswers);
      break;
    case ProjectTypes.MONOREPO:
      initMonorepo(followUpAnswers);
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
    {
      type: 'confirm',
      name: 'createProject',
      // eslint-disable-next-line max-len
      message: 'The project will be created in current directory with the folder name as the project name, sure you wanna continue?',
      default: true,
    },
  ];

  const { type, createProject } = await terminalQandA(questions);
  if (!createProject) {
    // eslint-disable-next-line max-len
    console.log('Ok let\'s stop here ..');
    console.log('Make sure you are in a directory you wanna create the project at.');
    return;
  }
  console.log(`Great choice, will create a ${type} project for you`);
  console.log('Just a few more questions ...');

  const projectType:string = typeCaseInsesitive(type);
  const followUpQuestions:QuestionsAndAnswers[] = specificQuestions()[projectType]();
  const followUpAnswers = await terminalQandA(followUpQuestions);
  create(projectType, followUpAnswers);
};

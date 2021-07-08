import { terminalQandA } from '@/utils/helpers';
import { QuestionsAndAnswers, ProjectTypes } from '@/types/types';
import { frontend } from './followUpQuestions/frontend';
import { cli } from './followUpQuestions/cli';
import { frontendApi } from './followUpQuestions/frontend-api';
import { monorepo } from './followUpQuestions/monorepo';
import { initReact } from './init-react';
import { initVue } from './init-vue';
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
      initReact(followUpAnswers);
      break;
    case ProjectTypes.VUE:
      initVue(followUpAnswers);
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
  ];

  const { type } = await terminalQandA(questions);
  console.log(`Great choice, will create a ${type} project for you`);
  console.log('Just a few more questions ...');

  const projectType:string = typeCaseInsesitive(type);
  const followUpQuestions:QuestionsAndAnswers[] = specificQuestions()[projectType]();
  const followUpAnswers = await terminalQandA(followUpQuestions);
  create(projectType, followUpAnswers);
};

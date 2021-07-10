import { ProjectTypes } from '@/types/types';
import type {
  FrontendFrameworks,
  CompleteData,
} from '@/types/frontend-types';
import {
  UserFeedbackOptions,
  Languages,
  ESLint,
} from '@/types/frontend-types';
import { equalStrings } from '@/utils/helpers';

type Data = Partial<CompleteData>;

const reactTemplate = (name: string, ts: boolean, airbnb: boolean) =>
  `${ts ? `import type { FC } from 'react'${airbnb ? ';' : ''}` : ''}
${ts ? `\ninterface Props {}${airbnb ? ';' : ''}\n` : ''} 
const fileName = () => {
  const txt = 'fileName page';
  return <h1>{txt}</h1>;
}${airbnb ? ';' : ''}
  
export default fileName${airbnb ? ';' : ''}
`;

const vueTemplate = (name: string, ts: boolean, airbnb: boolean) => `
${ts && 'vue'}
${airbnb && 'airbnb'}
`;

export const getFile = (fileName: string, framework: FrontendFrameworks, data: Data): string => {
  const ts:boolean = equalStrings(data[UserFeedbackOptions.LANGUAGE] as string, Languages.TYPESCRIPT);
  const airbnb = data[UserFeedbackOptions.ESLINT_TYPE]
    && equalStrings(data[UserFeedbackOptions.ESLINT_TYPE] as string, ESLint.AIRBNB) as boolean;
  let template = '';

  switch (framework) {
    default:
    case ProjectTypes.REACT:
      template = reactTemplate(fileName, ts, airbnb as boolean);
      break;
    case ProjectTypes.VUE:
      template = vueTemplate(fileName, ts, airbnb as boolean);
      break;
  }
  return template;
};

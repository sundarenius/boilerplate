import { ProjectTypes } from '@/types/types';
import type {
  FrontendFrameworks,
  CompleteData,
} from '@/types/frontend-types';
import {
  UserFeedbackOptions,
  Testing,
} from '@/types/frontend-types';
import { arrIncludes } from '@/utils/helpers';

type Data = Partial<CompleteData>;

const folder = process.cwd().split('/')[process.cwd().split('/').length - 1];
const template = (scripts: string) =>
  `{
  "name": "${folder}",
  "version": "0.1.0",
  "private": true,
  "description": "An awesome project generated with boilerplate-cli",
  "scripts": {
    ${scripts}
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`;

const common = (data: Data) => {
  const unit = arrIncludes(UserFeedbackOptions.TESTING, data, Testing.UNIT);
  const e2e = arrIncludes(UserFeedbackOptions.TESTING, data, Testing.E2E);
  return `${unit ? `"test:unit": "echo unit scripts are coming"${e2e ? ',' : ''}` : ''}
${e2e ? '"test:e2e": "echo e2e scripts are coming"' : ''}
`;
};

const reactScripts = (data: Data) =>
  `"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject",
${common(data)}
`;

const vueScripts = (data: Data) =>
  `"serve": "vue-cli-service serve",
"build": "vue-cli-service build",
${common(data)}
`;

export const getPackageJson = (framework: FrontendFrameworks, data: Data): string => {
  let scripts = '';
  switch (framework) {
    default:
    case ProjectTypes.REACT:
      scripts = reactScripts(data);
      break;
    case ProjectTypes.VUE:
      scripts = vueScripts(data);
      break;
  }
  const theTemplate:string = template(scripts);
  const templateFixed = JSON.stringify(JSON.parse(theTemplate), null, 2);
  return templateFixed;
};

import { ProjectTypes } from '@/types/types';
import type {
  FrontendFrameworks,
  CompleteData,
} from '@/types/frontend-types';
import {
  UserFeedbackOptions,
  Languages,
  ESLint,
  ComponentEnums,
} from '@/types/frontend-types';
import { equalStrings, semi } from '@/utils/helpers';
import { getCmpnt } from '@/templates/frontend/base-cmpnt';

const name = 'App';

type Data = Partial<CompleteData>;

const react = (ts: boolean, airbnb: boolean):string =>
  `const ${name} = () => {
  const txt = '${name} page'${semi(airbnb)}
  return <h1>{txt}</h1>${semi(airbnb)}
}${semi(airbnb)}`;

const vue = (ts: boolean):string =>
  `<div>
    ${name} ${ts ? 'typescript' : 'javsacript'} content !!
  </div>`;

export const getApp = (framework: FrontendFrameworks, data: Data): string => {
  const ts:boolean = equalStrings(data[UserFeedbackOptions.LANGUAGE] as string, Languages.TYPESCRIPT);
  const airbnb = data[UserFeedbackOptions.ESLINT_TYPE]
    && equalStrings(data[UserFeedbackOptions.ESLINT_TYPE] as string, ESLint.AIRBNB) as boolean;
  let template = '';

  const baseCmpntArgs = (contentType: (ts: boolean, airbnb: boolean) => string) => ({
    name,
    framework,
    data,
    cmpnts: [
      ComponentEnums.MENU,
      ComponentEnums.FOOTER,
    ],
    template: {
      props: [
        {
          name: 'testProp',
          type: 'number',
        },
        {
          name: 'anotherProp',
          type: 'string',
        },
      ],
      content: contentType(ts as boolean, airbnb as boolean),
    },
  });

  switch (framework) {
    default:
    case ProjectTypes.REACT:
      template = getCmpnt({
        ...baseCmpntArgs(react),
      });
      break;
    case ProjectTypes.VUE:
      template = getCmpnt({
        ...baseCmpntArgs(vue),
      });
      break;
  }
  return template;
};

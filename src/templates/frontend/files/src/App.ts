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

  switch (framework) {
    default:
    case ProjectTypes.REACT:
      template = getCmpnt(
        name,
        framework,
        data,
        [
          {
            component: ComponentEnums.MENU,
          },
          {
            component: ComponentEnums.FOOTER,
          },
        ],
        {
          content: react(ts as boolean, airbnb as boolean),
        },
      );
      break;
    case ProjectTypes.VUE:
      template = getCmpnt(
        name,
        framework,
        data,
        undefined,
        {
          content: vue(ts as boolean),
        },
      );
      break;
  }
  return template;
};

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
  AppTypes,
  CompleteDataKeys,
  RouterFiles,
} from '@/types/frontend-types';
import { equalStrings, semi, arrIncludes } from '@/utils/helpers';
import { getCmpnt } from '@/templates/frontend/base-cmpnt';

const name = 'App';

type Data = Partial<CompleteData>;

interface Params {
  data: Data,
  ts: boolean,
  airbnb: boolean
}

const menu = (render: boolean) => (render ? '\n<Menu />' : '');
const react = ({ airbnb, data }: Params):string =>
  `const ${name} = () => {
  const txt = '${name} page'${semi(airbnb)}
  return (
    <>${menu(arrIncludes(
    UserFeedbackOptions.BASE_COMPONENTS,
    data,
    ComponentEnums.MENU,
  ))}
      ${data[UserFeedbackOptions.ROUTING]
        || equalStrings(data[UserFeedbackOptions.APP_TYPE] as string, AppTypes.SSR)
    ? `<${RouterFiles.ROUTES} />`
    : ''}
    </>
  )${semi(airbnb)}
}${semi(airbnb)}`;

const vue = ({ ts, data }: Params):string =>
  `<div>
    ${name} ${ts ? 'typescript' : 'javsacript'} content !!
    ${data[UserFeedbackOptions.ROUTING]
        || equalStrings(data[UserFeedbackOptions.APP_TYPE] as string, AppTypes.SSR)
    ? '<router-view />'
    : ''}
  </div>`;

const routerFile = (data: Data):string => {
  switch (data[CompleteDataKeys.FRAMEWORK]!.toLowerCase()) {
    case ProjectTypes.REACT.toLowerCase():
      return RouterFiles.ROUTES;
    case ProjectTypes.VUE.toLowerCase():
    default:
      return RouterFiles.ROUTER;
  }
};
const routerData = (data: Data):string|null => {
  const routeComponent = data[UserFeedbackOptions.ROUTING]
    || equalStrings(data[UserFeedbackOptions.APP_TYPE] as string, AppTypes.SSR)
    ? routerFile(data)
    : null;
  return routeComponent;
};

export const getApp = (framework: FrontendFrameworks, data: Data): string => {
  const ts:boolean = equalStrings(data[UserFeedbackOptions.LANGUAGE] as string, Languages.TYPESCRIPT);
  const airbnb = equalStrings(data[UserFeedbackOptions.ESLINT_TYPE] as string, ESLint.AIRBNB) as boolean;
  let template = '';

  const routeComponent: string|null = routerData(data);

  const baseCmpntArgs = (contentType: (params: Params) => string) => ({
    name,
    framework,
    data,
    cmpnts: [
      ComponentEnums.MENU,
      ComponentEnums.FOOTER,
      {
        cmpnt: routeComponent,
        path: '@/router/',
      },
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
      content: contentType({
        ts,
        airbnb,
        data,
      }),
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

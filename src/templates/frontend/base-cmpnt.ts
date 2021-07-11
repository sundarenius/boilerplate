import { ProjectTypes } from '@/types/types';
import type {
  FrontendFrameworks,
  CompleteData,
  Template,
  Prop,
  ComponentEnums,
} from '@/types/frontend-types';
import {
  UserFeedbackOptions,
  Languages,
  ESLint,
} from '@/types/frontend-types';
import { equalStrings, semi, comma } from '@/utils/helpers';

// It's ok if indentation is not perfect, eslint cli can fix that later

type Data = Partial<CompleteData>;

const endOfLineComma = (index: number, props: Prop[], airbnb:boolean) =>
  (index === props!.length - 1 ? comma(airbnb) : '');

const reactTemplate = (
  name: string,
  ts: boolean,
  airbnb: boolean,
  cmpnts: undefined|ComponentEnums[],
  template: Template,
) =>
  `${ts ? `import type { FC } from 'react'${semi(airbnb)}\n` : ''}${cmpnts
    ? `${cmpnts.map((component: ComponentEnums) =>
      `import ${component} from '@/components/${component}'${semi(airbnb)}`).join('\n')}`
    : ''}
${ts ? `\ninterface Props {${template.props
    ? `
  ${template.props.map((prop: Prop, i: number) =>
    `${prop.name}: ${prop.type}${endOfLineComma(i, template.props as Prop[], airbnb)}`).join(',\n')}
`
    : ''}}${semi(airbnb)}\n` : ''} 
${template.content}
  
export default ${name}${semi(airbnb)}
`;

const vueTemplate = (
  name: string,
  ts: boolean,
  airbnb: boolean,
  cmpnts: undefined|ComponentEnums[],
  template: Template,
) =>
  `<template>
  ${template.content}
</template>

<script>
${cmpnts
    ? `${cmpnts.map((component: ComponentEnums) =>
      `import ${component} from '@/components/${component}.vue'${semi(airbnb)}`).join('\n')}`
    : ''}

export default {
  name: '${name}',
  ${cmpnts
    ? `components: {
    ${cmpnts.map((component: ComponentEnums, i: number) =>
    `${component}${endOfLineComma(i, template.props as Prop[], airbnb)}`).join(',\n')}
  }${template.props ? ',' : ''}`
    : ''}
  ${template.props
    ? `props: {
      ${template.props.map((prop: Prop, i) =>
    `${prop.name}: {
        type: ${prop.type},
        required: true${comma(airbnb)}
      }${endOfLineComma(i, template.props as Prop[], airbnb)}`).join(',\n')}
    }${comma(airbnb)}`
    : ''}
}
</script>

<style lang="scss" scoped>
</style>
`;

interface GetCmpnt {
  name: string,
  framework: FrontendFrameworks,
  data: Data,
  cmpnts: undefined|ComponentEnums[],
  template: Template,
}
export const getCmpnt = ({
  name,
  framework,
  data,
  cmpnts,
  template,
}: GetCmpnt): string => {
  const ts:boolean = equalStrings(data[UserFeedbackOptions.LANGUAGE] as string, Languages.TYPESCRIPT);
  const airbnb = data[UserFeedbackOptions.ESLINT_TYPE]
    && equalStrings(data[UserFeedbackOptions.ESLINT_TYPE] as string, ESLint.AIRBNB) as boolean;
  let content = '';

  switch (framework) {
    default:
    case ProjectTypes.REACT:
      content = reactTemplate(name, ts, airbnb as boolean, cmpnts, template);
      break;
    case ProjectTypes.VUE:
      content = vueTemplate(name, ts, airbnb as boolean, cmpnts, template);
      break;
  }
  return content;
};

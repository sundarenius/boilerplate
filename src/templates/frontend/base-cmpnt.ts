import { ProjectTypes } from '@/types/types';
import type {
  FrontendFrameworks,
  CompleteData,
  Components,
  Template,
  Prop,
} from '@/types/frontend-types';
import {
  UserFeedbackOptions,
  Languages,
  ESLint,
} from '@/types/frontend-types';
import { equalStrings, semi } from '@/utils/helpers';

type Data = Partial<CompleteData>;

const reactTemplate = (
  name: string,
  ts: boolean,
  airbnb: boolean,
  cmpnts: undefined|Components[],
  template: Template,
) =>
  `${ts ? `import type { FC } from 'react'${semi(airbnb)}` : ''}
${cmpnts
    ? `${cmpnts.map((c: Components) =>
      `import ${c.component} from '@/components/${c.component}'${semi(airbnb)}`).join('\n')}`
    : ''}
${ts ? `\ninterface Props {${template.props
    ? `${template.props.map((prop: Prop) =>
      `${prop.name}: ${prop.type}'${semi(airbnb)}\n`)}`
    : ''}}${semi(airbnb)}\n` : ''} 
${template.content}
  
export default ${name}${semi(airbnb)}
`;

const vueTemplate = (
  name: string,
  ts: boolean,
  airbnb: boolean,
  cmpnts: undefined|Components[],
  template: Template,
) =>
  `<template>
${template.content}
</template>

<script>
${cmpnts
    ? `${cmpnts.map((c: Components) =>
      `import ${c.component} from '@/components/${c.component}.vue'${semi(airbnb)}`).join('\n')}`
    : ''}

export default {
  name: '${name}',
  ${cmpnts
    ? `components: {
      ${cmpnts.map((c: Components) => `${c.component}${semi(airbnb)}\n,`)}
    }`
    : ''}
  ${template.props
    ? `props: {
      ${template.props.map((prop: Prop) =>
    `
      ${prop.name}: {
        type: ${prop.type},
        required: true${semi(airbnb)},
      },
    `)}
    }`
    : ''}
}
</script>

<style lang="scss" scoped>
</style>
`;

export const getCmpnt = (
  fileName: string,
  framework: FrontendFrameworks,
  data: Data,
  cmpnts: undefined|Components[],
  template: Template,
): string => {
  const ts:boolean = equalStrings(data[UserFeedbackOptions.LANGUAGE] as string, Languages.TYPESCRIPT);
  const airbnb = data[UserFeedbackOptions.ESLINT_TYPE]
    && equalStrings(data[UserFeedbackOptions.ESLINT_TYPE] as string, ESLint.AIRBNB) as boolean;
  let content = '';

  switch (framework) {
    default:
    case ProjectTypes.REACT:
      content = reactTemplate(fileName, ts, airbnb as boolean, cmpnts, template);
      break;
    case ProjectTypes.VUE:
      content = vueTemplate(fileName, ts, airbnb as boolean, cmpnts, template);
      break;
  }
  return content;
};

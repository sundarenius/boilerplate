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

const semi = (airbnb: boolean) => (airbnb ? ';' : '');
const comma = (airbnb: boolean) => (airbnb ? ',' : '');

const reactTemplate = (ts: boolean, airbnb: boolean) =>
  `${ts ? `import type { FC } from 'react'${semi(airbnb)}` : ''}
${ts ? `\ninterface Props {}${semi(airbnb)}\n` : ''} 
const App = () => {
  const txt = 'App page';
  return <h1>{txt}</h1>;
}${semi(airbnb)}
  
export default App${semi(airbnb)}
`;

const vueTemplate = (ts: boolean, airbnb: boolean) =>
  `<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'${semi(airbnb)}

export default {
  name: 'App',
  components: {
    HelloWorld${comma(airbnb)}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
`;

export const getApp = (framework: FrontendFrameworks, data: Data): string => {
  const ts:boolean = equalStrings(data[UserFeedbackOptions.LANGUAGE] as string, Languages.TYPESCRIPT);
  const airbnb = data[UserFeedbackOptions.ESLINT_TYPE]
    && equalStrings(data[UserFeedbackOptions.ESLINT_TYPE] as string, ESLint.AIRBNB) as boolean;
  let template = '';

  switch (framework) {
    default:
    case ProjectTypes.REACT:
      template = reactTemplate(ts, airbnb as boolean);
      break;
    case ProjectTypes.VUE:
      template = vueTemplate(ts, airbnb as boolean);
      break;
  }
  return template;
};

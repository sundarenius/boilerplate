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

const reactTemplate = (ts: boolean, airbnb: boolean) =>
  `import React from 'react'${airbnb ? ';' : ''}
import ReactDOM from 'react-dom'${airbnb ? ';' : ''}
import './index.css'${airbnb ? ';' : ''}
import App from './App'${airbnb ? ';' : ''}
import { store } from './app/store'${airbnb ? ';' : ''}
import { Provider } from 'react-redux'${airbnb ? ';' : ''}
// import * as serviceWorker from './serviceWorker'${airbnb ? ';' : ''}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)${airbnb ? ';' : ''}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister(); include this maybe????
`;

const vueTemplate = (ts: boolean, airbnb: boolean) =>
  `import { createApp } from 'vue'${airbnb ? ';' : ''}
import App from './App.vue'${airbnb ? ';' : ''}
import router from './router'${airbnb ? ';' : ''}
import store from './store'${airbnb ? ';' : ''}

createApp(App).use(store).use(router).mount('#app')${airbnb ? ';' : ''}
`;

export const getMain = (framework: FrontendFrameworks, data: Data): string => {
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

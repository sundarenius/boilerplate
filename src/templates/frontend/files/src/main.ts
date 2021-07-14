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
import { equalStrings, semi } from '@/utils/helpers';

type Data = Partial<CompleteData>;

const reactTemplate = (ts: boolean, airbnb: boolean) =>
  `import React from 'react'${semi(airbnb)}
import ReactDOM from 'react-dom'${semi(airbnb)}
import '@/styles/main.scss'${semi(airbnb)}
import App from '@/App'${semi(airbnb)}
import { store } from '@/app/store'${semi(airbnb)}
import { Provider } from 'react-redux'${semi(airbnb)}
// import * as serviceWorker from '@/serviceWorker'${semi(airbnb)}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)${semi(airbnb)}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister(); include this maybe????
`;

const vueTemplate = (ts: boolean, airbnb: boolean) =>
  `import { createApp } from 'vue'${semi(airbnb)}
import App from '@/App.vue'${semi(airbnb)}
import router from '@/router'${semi(airbnb)}
import store from '@/store'${semi(airbnb)}

createApp(App).use(store).use(router).mount('#app')${semi(airbnb)}
`;

export const getMain = (framework: FrontendFrameworks, data: Data): string => {
  const ts:boolean = equalStrings(data[UserFeedbackOptions.LANGUAGE] as string, Languages.TYPESCRIPT);
  const airbnb = equalStrings(data[UserFeedbackOptions.ESLINT_TYPE] as string, ESLint.AIRBNB) as boolean;
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

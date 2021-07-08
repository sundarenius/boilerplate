/* eslint-disable @typescript-eslint/no-unused-vars */

export enum NameOptions {
  APP_TYPE = 'appType',
  LANGUAGE = 'language',
  ESLINT = 'eslint',
  STATE_MANAGEMENT = 'stateManagement',
  CSS_PROCESSOR = 'css-processor',
  TESTING = 'testing',
  ROUTING = 'routing',
  HISTORY_ROUTER = 'historyRouter',
  ESLINT_TYPE = 'eslintType',
  UI_FRAMEWORK = 'UiFramework',
}

export enum AppTypes {
  SPA = 'SPA',
  SSR = 'SSR'
}

export enum Languages {
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript'
}

export enum CssPreProcessor {
  SASS = 'Sass/SCSS',
  LESS = 'Less',
  NONE = 'None, (normal css)'
}

export enum Testing {
  UNIT = 'Unit (jest)',
  E2E = 'E2E (cypress)'
}

export enum ESLint {
  AIRBNB = 'Airbnb',
  STANDARD = 'Standard'
}

export enum ReactUiFrameWorks {
  SEMANTIC_UI = 'Semantic UI',
  NONE = 'none'
}

export enum VueUiFrameWorks {
  VUETIFY = 'Vuetify',
  NONE = 'none'
}

export interface RoutesData {
  name: string,
}

export interface GlobalState {
  name: string,
  state: Record<string, any>,
  dispatchables: Array<string> | 'all'
}

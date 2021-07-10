import type { ProjectTypes } from './types';

// ****** JSON OUTPUT TYPES DATA START ******
/*
 * @interface
 * Interface for what data is included in the generated JSON file.
 */
export enum CompleteDataKeys {
  FRAMEWORK = 'framework',
  THEME = 'theme',
  CAN_OVERWRITE_APP = 'canOverwriteApp',
  ROUTES = 'routes',
  GLOBAL_STATE = 'globalState',
  SIZE = 'size'
}
type UserFeedbackOptionsInterface = Partial<Record<
  UserFeedbackOptions, string|boolean|string[]|boolean[]>
>
export interface CompleteData extends UserFeedbackOptionsInterface {
  [CompleteDataKeys.FRAMEWORK]: FrontendFrameworks,
  [CompleteDataKeys.THEME]: Themes
  [CompleteDataKeys.CAN_OVERWRITE_APP]: boolean, // can still modify and add on top though.
  [CompleteDataKeys.ROUTES]?: Routes,
  [CompleteDataKeys.GLOBAL_STATE]?: States,
  [CompleteDataKeys.SIZE]: string|number
}
/*
 * Some keys in UserFeedbackOptions impact the app more than other.
 * While some are just a tech stack, some choices are crucial for what type of app it will be, like:
 * 1. STATE_MANAGEMENT # the global state of the app
 * 2. ROUTING # the routing (pages to be included),
 *    if no routing is included, just add an App.{ext} file with some components.
 */
export enum UserFeedbackOptions {
  APP_TYPE = 'appType',
  LANGUAGE = 'language',
  ESLINT = 'eslint',
  STATE_MANAGEMENT = 'stateManagement', // Impacts the app
  CSS_PROCESSOR = 'cssProcessor',
  TESTING = 'testing',
  ROUTING = 'routing', // Impacts the app
  HISTORY_ROUTER = 'historyRouter',
  ESLINT_TYPE = 'eslintType',
  UI_FRAMEWORK = 'UiFramework',
  INCLUDE_DOCKER = 'includeDocker',
  AUTH_REQUIRED = 'authRequired',
  THEME = 'theme',
  BASE_COMPONENTS = 'baseComponents'
}
export const DefaultProject = '_DEFAULT_PROJECT_';
// ****** JSON OUTPUT TYPES DATA END ******

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

/*
 * Components is one the most important for this app to succeed
 * Have a lot of components based on UI frameworks with props,
 * (basic components if no UI-framework is selecter).
 * 1. All components should achieve the same with different UI frameworks.
 * 2. Components templates should be mapped in same maps with different frameworks used.
 * 3. All components should have a unit test file. (Can it be UI framework agnostic?, prob. not)
 * 4. Type of components:
 *     - sidedrawer
 *     - header
 *     - footer
 *     - inputs/dropdowns/textareas
 */

export enum ComponentEnums {
  MENU = 'Menu',
  FOOTER = 'Footer',
  SIDEBAR = 'Sidebar'
}
export interface Components {
  component: ComponentEnums
}

export interface RoutesData {
  name: string,
  path: string,
  components?: Components[]
}

export type Routes = Record<string, string|Array<RoutesData>>
export type States = Record<string, string|GlobalState>

export interface GlobalState {
  name: string,
  state: Record<string, any>,
  disptachActions: Array<string> | 'all'
}

export enum Themes {
  LIGHT_BLUE = 'Light blue',
  DARK_BLUE = 'Dark blue',
  DARK_GREEN = 'Dark green',
  LIGHT_GREEN = 'Light green',
  DARK_RED = 'Dark red',
  LIGHT_RED = 'Light red',
  DARK_INDIGO = 'Dark indigo',
  LIGHT_INDIGO = 'Light indigo',
  DARK_PURPLE = 'Dark purple',
  LIGHT_PURPLE = 'Light purple',
}

export type FrontendFrameworks = ProjectTypes.REACT|ProjectTypes.VUE

export enum FileType {
  FOLDER = 'folder',
  FILE = 'file'
}
export interface Path {
  path: string,
  type: FileType.FOLDER|FileType.FILE,
  if: boolean,
  template?: string
}

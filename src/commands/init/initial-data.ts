import type {
  Routes,
  States,
} from '@/types/frontend-types';
// import { ComponentEnums } from '@/types/frontend-types';

/*
 * Standard app
 * A configuration/documentation portal. A app guide of this CLI program.
 * The data here is framework agnostic
 * Make the theme look like termius webpage: https://termius.com/
 * Make the structure like https://www.typescriptlang.org/
 *
 */

export const initialRoute: () => Routes = () => ({
  // eslint-disable-next-line max-len
  _info: 'It`s good practice to name pages and components as PascalCase. Every name will be created as a page.',
  routes: [
    {
      name: 'Home',
      path: '/',
      components: [],
    },
    {
      name: 'ComponentsShowcase',
      path: '/components-showcase',
      components: [],
    },
  ],
});

export const initialState:() => States = () => ({
  // eslint-disable-next-line max-len
  _info: 'State management options. Each state here will be separated. Add state keys to the "disptachActions" array that should have a dispatch action, or add "all" to include all',
  context: {
    name: 'storeContext',
    state: {
      sidebar: false,
      title: 'This is a generated "boilerplate" showcase page',
      subTitle: 'Take the tour of how this works and check out all our components',
    },
    disptachActions: [
      'sidebar',
    ],
  },
  componentContext: {
    name: 'componentContext',
    state: {
      componentShowcase: null,
    },
    disptachActions: ['all'],
  },
});

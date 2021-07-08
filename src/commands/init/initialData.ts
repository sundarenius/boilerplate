import {
  Routes,
  States,
} from '@/types/frontend-types';

/*
 * Standard app
 * A configuration/documenation portal. A app guide of this CLI program.
 * The data here is framework agnostic
 *
 */

export const initialRoute: () => Routes = () => ({
  // eslint-disable-next-line max-len
  _info: 'It`s good practice to name pages and components as PascalCase. Every name will be created as a page.',
  routeOne: {
    name: 'RouteOne',
  },
  routeTwo: {
    name: 'RouteTwo',
  },
});

export const initialState:() => States = () => ({
  // eslint-disable-next-line max-len
  _info: 'State management options. Each state here will be separated. Add state keys to the "dispatchables" array that should have a dispatch action, or add "all" to include all',
  context: {
    name: 'context',
    state: {
      isAuth: false,
      config: {
        configOne: true,
        configTwo: null,
      },
    },
    dispatchables: 'all',
  },
  specificContext: {
    name: 'context',
    state: {
      title: 'Welcome to ** something',
      price: true,
    },
    dispatchables: ['price'],
  },
});

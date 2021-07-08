import {
  GlobalState,
  RoutesData,
} from '@/types/frontend-types';

/*
 * Standard app
 * A configuration/documenation portal. A app guide of this CLI program.
 *
 */

export const initialRoute: () => Record<string, string|RoutesData> = () => ({
  // eslint-disable-next-line max-len
  _info: 'It`s good practice to name pages and components as PascalCase. Every name will be created as a page.',
  routeOne: {
    name: 'RouteOne',
  },
  routeTwo: {
    name: 'RouteTwo',
  },
});

export const initialState:() => Record<string, string|GlobalState> = () => ({
  // eslint-disable-next-line max-len
  _info: 'Add state management here, each state here will be separated. Add state keys to "dispatchables" array that should have dispatch actions, or add "all" to add for all',
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

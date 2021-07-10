import { CommandInitArgument } from '@/types/types';
import {
  init,
  build,
  add,
} from '@/commands/commands';

export const start = (arg: string|undefined) => {
  switch (arg) {
    case CommandInitArgument.INIT:
      init();
      break;
    case CommandInitArgument.BUILD:
      build({}, null);
      break;
    case CommandInitArgument.ADD:
      add();
      break;
    default:
      console.log('No correct args was given');
      console.log('Please provider one of following args:');
      console.log(Object.values(CommandInitArgument));
      break;
  }
};

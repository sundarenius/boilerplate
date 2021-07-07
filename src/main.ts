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
      build();
      break;
    case CommandInitArgument.ADD:
      add();
      break;
    default:
      break;
  }
};

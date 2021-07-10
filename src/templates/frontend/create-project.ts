import type {
  Path,
} from '@/types/frontend-types';
import { FileType } from '@/types/frontend-types';
import { createFile, mkDir } from '@/utils/helpers';

const createDirs = (structure: Path[]) => {
  structure.forEach((val: Path) => {
    if (val.if && val.type === FileType.FOLDER) {
      mkDir(val.path);
    }
  });
};

const createFiles = (structure: Path[]) => {
  structure.forEach((val:Path) => {
    if (val.if && FileType.FILE) {
      createFile(val.path, 'NO CONTENT YET!!');
    }
  });
};

export const createProjectStructure = (structure: Path[]) => {
  createDirs(structure);
  createFiles(structure);
};

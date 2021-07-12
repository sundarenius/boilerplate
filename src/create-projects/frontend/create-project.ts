import type {
  Path,
} from '@/types/frontend-types';
import { FileType } from '@/types/frontend-types';
import { createFile, mkDir } from '@/utils/helpers';

const createDirs = (structure: Path[]) => {
  structure.forEach((val: Path) => {
    if (val.if && (val.type === FileType.FOLDER)) {
      mkDir(val.path);
    }
  });
};

const createFiles = async (structure: Path[]) => new Promise((res) => {
  const createFilesPromies = structure.map((val:Path) => {
    try {
      return createFile(val.path, val.template || 'NO CONTENT YET!!');
    } catch (err) {
      console.log(err);
      console.log('Error at create-projects.ts -> createFiles');
      return new Promise((r) => r(null));
    }
  });
  Promise.all(createFilesPromies).then(() => {
    res(null);
  });
});

export const createProjectStructure = async (structure: Path[]) => {
  createDirs(structure);
  await createFiles(structure.filter((val:Path) => val.type === FileType.FILE && val.if));
};

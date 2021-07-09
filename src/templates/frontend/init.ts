import { ProjectTypes } from '@/types/types';
import type {
  CompleteData,
  Paths,
} from '@/types/frontend-types';
import {
  UserFeedbackOptions,
  Languages,
  CompleteDataKeys,
} from '@/types/frontend-types';

const getCmpntExt = (isTs:boolean, framework:any) => {
  switch (framework) {
    case ProjectTypes.REACT:
    default:
      return isTs ? '.tsx' : '.jsx';
    case ProjectTypes.VUE:
      return '.vue';
  }
};

type FolderAndFilesStructure = (data: Partial<CompleteData>) => Paths
const folderAndFilesStructure: FolderAndFilesStructure = (data) => {
  const ts = data[UserFeedbackOptions.LANGUAGE] === Languages.TYPESCRIPT;
  const cmpntExt = getCmpntExt(ts, data[CompleteDataKeys.FRAMEWORK]);
  const storeType = data[CompleteDataKeys.FRAMEWORK] === ProjectTypes.REACT ? 'redux' : 'vuex';
  const ext = ts ? '.ts' : '.js';
  const routerFile = data[CompleteDataKeys.FRAMEWORK] === ProjectTypes.REACT
    ? `Routes${cmpntExt}`
    : `router${ext}`;

  /*
   * @returns {object} folder and files paths.
   * Root files like .gitignore, package.json etc.. will be generated by shell script later.
   * Files/folders should follow exact order in the tree object. from parent -> child.
   * Add available components conditionally here (loop).
   */

  const paths: Paths = {
    src: 'src',
    index: `src/index${ext}`,
    app: `src/App${cmpntExt}`,
    unitConfig: `src/unit-config${ext}`,
    components: 'src/components',
    menu: `src/components/Menu${ext}`,
    footer: `src/components/Footer${ext}`,
    sidebar: `src/components/Sidebar${ext}`,
    pages: 'src/pages',
    router: `src/${routerFile}`,
    state: `src/${storeType}`,
    store: `src/${storeType}/store${ext}`,
    styles: 'src/styles',
    types: 'src/types',
    globals: `src/types/globals${ext}`,
    utils: 'src/utils',
    helpers: `src/utils/helpers${ext}`,
    e2e: 'src/e2e', // genererate cypress with shell script
  };

  return paths;
};

export const initFrontEndTemplate = (data: Partial<CompleteData>) => {
  console.log('initFrontEndTemplate');
  console.log(JSON.stringify(data, null, 4));
  folderAndFilesStructure(data);
};

import { DefaultProject } from '@/types/frontend-types';
import type { CompleteData } from '@/types/frontend-types';
import { JsonTemplateFileNames } from '@/types/types';
import { fileExists, readJsonFile } from '@/utils/helpers';

const buildProject = (data: Partial<CompleteData>) => {
  // Let's begin building the project .. somehow
  // all based on data object and process.env.DEFAULT_PROJECT :D
  console.log('buildProject');
  console.log(JSON.stringify(data, null, 2));
};

const getJsonTemplate = () => {
  // console.log(files);
  const fileFound = Object.values(JsonTemplateFileNames).find((val) => fileExists(`${val}.json`));
  console.log(fileFound);
  if (fileFound) {
    const jsonData = readJsonFile(`${fileFound}.json`);
    buildProject(jsonData);
  } else {
    console.log('No JSON template found at root folder.');
    // eslint-disable-next-line max-len
    console.log('Initiate a JSON template file with the "boilerplate --init" command and then run "boilerplate --build"');
  }
};

/*
 * @param {object} data # If this is being triggered from the "--init".
 *        it will have some default data to build a default project,
 *        must have (defaultProject === DefaultProject).
 *        This will be an empty object if coming from command line and thus will first check
 *        if there is an valid JSON template file at root.
 * @param {string|null} defaultProject # If we should build a project with default settings,
 *        (coming from the "--init" process)
 */
export const build = (data: Partial<CompleteData>, defaultProject: null|string) => {
  console.log('Welcome to build function');
  if (defaultProject === DefaultProject) {
    process.env.DEFAULT_PROJECT = defaultProject;
    console.log('Ok let\'s build an default project with your settings');
    buildProject(data);
  } else {
    getJsonTemplate();
  }
};

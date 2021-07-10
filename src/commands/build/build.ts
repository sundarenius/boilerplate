import { DefaultProject } from '@/types/frontend-types';
import type { CompleteData } from '@/types/frontend-types';
import { JsonTemplateFileName } from '@/types/types';
import { fileExists, readJsonFile } from '@/utils/helpers';
import { initFrontEndTemplate } from '@/templates/frontend/init';

const getJsonTemplate = () => {
  const fileFound = fileExists(`${JsonTemplateFileName.BOILERPLATE}.json`);
  if (fileFound) {
    const jsonData = readJsonFile(`${fileFound}.json`);
    initFrontEndTemplate(jsonData);
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
  if (defaultProject === DefaultProject) {
    process.env.DEFAULT_PROJECT = defaultProject;
    console.log('Ok let\'s build an default project with your settings');
    initFrontEndTemplate(data);
  } else {
    getJsonTemplate();
  }
};

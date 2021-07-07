/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

export enum CommandInitArgument {
  INIT = '--init',
  ADD = '--add',
  BUILD = '--build'
}

export type QuestionsAndAnswers = Record<string, any>

export enum ProjectTypes {
  REACT = 'React',
  VUE = 'Vue',
  FRONTEND_API = 'Frontend API',
  CLI = 'CLI',
  MONOREPO = 'Monorepo'
}

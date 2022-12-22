/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '',
  modulePaths: ['<rootDir>', '<rootDir>/node_modules'],
  collectCoverageFrom: [
    'context_container',
    'controllers',
    'entities',
    'interactors',
    'presenters',
  ].map((folder) => `src/server/${folder}/**/*.ts`),
};

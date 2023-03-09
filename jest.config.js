const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')
// ^ From https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/#jest-config-with-helper

const mapper = pathsToModuleNameMapper(compilerOptions.paths)
mapper['^(\\.{1,2}/.*)\\.js$'] = '$1' 

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Manual additions after this point
  
  // added from ts-jest guide 
  // https://kulshekhar.github.io/ts-jest/docs/guides/esm-support
  // added tsx
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },

  // From ts-jest guide on supporting paths mapping
  // note we replaced the moduleNameMapper given in the startup guide above
  modulePaths: [compilerOptions.baseUrl],
  // moduleNameMapper: {
  //   '^(\\.{1,2}/.*)\\.js$': '$1',
  // },
  moduleNameMapper: mapper,
};

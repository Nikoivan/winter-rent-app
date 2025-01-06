import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        babelConfig: {
          presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript']
        }
      }
    ],
    '^.+\\.jsx?$': [
      'ts-jest',
      {
        useESM: true,
        babelConfig: {
          presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript']
        }
      }
    ]
  }
};

export default config;

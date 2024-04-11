import type {Config} from 'jest';

// silent : hide show console.log
const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  silent: false
};

export default config;
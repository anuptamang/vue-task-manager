module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.jest.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^primevue$': '<rootDir>/tests/__mocks__/primevue.ts',
    '^primevue/(.*)$': '<rootDir>/tests/__mocks__/primevue.ts',
    '^quill$': '<rootDir>/tests/__mocks__/quill.ts',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/entry-*.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};

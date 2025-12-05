import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  use: {
    // Configure the testing framework settings here
    // Example for Jest
    jest: {
      testEnvironment: 'node',
    },
  },
});
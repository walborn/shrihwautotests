import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => ({
  roots: [ '<rootDir>/test/unit' ],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  setupFilesAfterEnv: [ '<rootDir>/jest.setup.ts' ],
  moduleDirectories: ['node_modules', '.'],
  testEnvironment: 'jsdom',
})

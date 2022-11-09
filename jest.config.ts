export default {
  collectCoverageFrom: ['src/*.{js,ts}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 75,
      statements: 75,
    },
  },
  globals: {
    'ts-jest': {
      allowJs: true,
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/dist/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
}

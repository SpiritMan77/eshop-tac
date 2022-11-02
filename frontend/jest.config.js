module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  coveragePathIgnorePatterns: ['/src/asset', '/src/plugins', '/src/services', '/src/store', '/src/router'],
  testMatch: [
    '**/__tests__/**/*.spec.(js|jsx|ts|tsx)',
    '**/tests/unit/**/*.spec.{j,t}s?(x)',
  ],
  moduleFileExtensions: ['vue', 'js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
}

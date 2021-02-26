module.exports = api => {
  api.cache.forever()

  const presets = [
    [
      '@babel/env',
      {
        corejs: {
          proposals: true,
          version: 3,
        },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/react',
      {
        development: true,
        runtime: 'automatic',
        useBuiltIns: true,
      },
    ],
  ]

  const plugins = [
    '@babel/proposal-async-generator-functions',
    [
      '@babel/proposal-decorators',
      {
        decoratorsBeforeExport: false,
        legacy: false,
      },
    ],
    '@babel/proposal-class-properties',
    '@babel/proposal-do-expressions',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    '@babel/proposal-function-bind',
    '@babel/proposal-function-sent',
    '@babel/proposal-logical-assignment-operators',
    '@babel/proposal-nullish-coalescing-operator',
    '@babel/proposal-numeric-separator',
    '@babel/proposal-optional-catch-binding',
    '@babel/proposal-optional-chaining',
    '@babel/proposal-partial-application',
    [
      '@babel/proposal-pipeline-operator',
      {
        proposal: 'smart',
      },
    ],
    '@babel/proposal-private-methods',
    '@babel/proposal-throw-expressions',
    '@babel/proposal-unicode-property-regex',
    '@babel/syntax-dynamic-import',
    [
      '@babel/transform-regenerator',
      {
        async: false,
        asyncGenerators: true,
        generators: true,
      },
    ],
    '@loadable/babel-plugin',
    'lodash',
    [
      'ramda',
      {
        useES: true,
      },
    ],
    [
      '@babel/transform-runtime',
      {
        absoluteRuntime: true,
        corejs: {
          proposals: true,
          version: 3,
        },
        useESModules: false,
      },
    ],
    [
      'module:fast-async',
      {
        compiler: {
          engine: true,
          es6target: true,
          lazyThenables: true,
          parser: {
            sourceType: 'module',
          },
          sourceMap: true,
          wrapAwait: true,
        },
        useRuntimeModule: true,
      },
    ],
  ]

  return {
    ignore: [/node_modules/, /vendor/],
    presets,
    plugins,
  }
}

const { client } = require('./common')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('merge-deep')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')

const enableWDYR = process.env.WHY_DID_YOU_RENDER != null

client.mode('development').devtool('source-map')

client.output.publicPath('/')

client.module
  .rule('babel')
  .use('babel')
  .tap(options =>
    merge(options, {
      presets: [
        [
          '@babel/react',
          {
            development: true,
            importSource: enableWDYR
              ? '@welldone-software/why-did-you-render'
              : 'react',
            runtime: 'automatic',
            useBuiltIns: true,
          },
        ],
      ],
      plugins: [
        'react-refresh/babel',
        [
          'styled-components',
          {
            displayName: true,
            fileName: true,
            ssr: false,
          },
        ],
      ],
    }),
  )
  .end()

if (enableWDYR) {
  client.entry('main').prepend('./client/wdyr')
}

client
  .plugin('define')
  .tap(([options]) => [merge(options, { __DEV__: JSON.stringify(true) })])

client.plugin('html').use(HTMLPlugin, [
  {
    chunks: ['main'],
    filename: 'index.html',
    hash: true,
    scriptLoading: 'defer',
    template: './index.html',
  },
])

client.plugin('hmr').use(webpack.HotModuleReplacementPlugin)

client.plugin('fast-refresh').use(ReactRefreshPlugin)

client.set('cache', {
  type: 'filesystem',
})

client.merge({
  snapshot: {
    buildDependencies: {
      hash: false,
      timestamp: true,
    },
    module: {
      hash: false,
      timestamp: true,
    },
    resolve: {
      hash: false,
      timestamp: true,
    },
    resolveBuildDependencies: {
      hash: false,
      timestamp: true,
    },
  },
})

module.exports = client.toConfig()

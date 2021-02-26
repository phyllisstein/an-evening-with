const Config = require('webpack-chain')
const LoadablePlugin = require('@loadable/webpack-plugin')
const merge = require('merge-deep')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')

const client = new Config()
const server = new Config()

const BABEL_OPTIONS = {
    babelrc: false,
    cacheDirectory: true,
    presets: [],
    plugins: [
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
        '@babel/plugin-proposal-partial-application',
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
        'lodash',
        [
            'ramda',
            {
                useES: true,
            },
        ],
        '@loadable/babel-plugin',
    ],
}

client.name('client').context(path.resolve('./src')).target('web')

client.entry('main').add('./client').end()

client.output
    .chunkFilename('js/[name].js')
    .filename('js/[name].js')
    .path(path.resolve('dist', 'public'))
    .publicPath('/')

client.module
    .rule('babel')
    .test(/\.(j|mj|t)sx?$/)
    .exclude.add(/node_modules/)
    .end()
    .use('babel')
    .loader('babel-loader')
    .options(
        merge(BABEL_OPTIONS, {
            presets: [
                [
                    '@babel/env',
                    {
                        exclude: [
                            'transform-async-to-generator',
                            'transform-regenerator',
                        ],
                        modules: false,
                        targets: {
                            browsers: [
                                'last 2 major versions and > 5% in US and not dead and not ie > 0',
                            ],
                        },
                    },
                ],
            ],
            plugins: [
                [
                    'polyfill-corejs3',
                    {
                        method: 'entry-global',
                        targets: {
                            browsers: [
                                'last 2 major versions and > 5% in US and not dead and not ie > 0',
                            ],
                        },
                    },
                ],
                [
                    'polyfill-regenerator',
                    {
                        method: 'usage-pure',
                        targets: {
                            browsers: [
                                'last 2 major versions and > 5% in US and not dead and not ie > 0',
                            ],
                        },
                    },
                ],
                [
                    'module:fast-async',
                    {
                        compiler: {
                            es6target: true,
                            lazyThenables: true,
                            parser: {
                                sourceType: 'module',
                            },
                            promises: true,
                            sourceMap: true,
                            wrapAwait: true,
                        },
                        useRuntimeModule: true,
                    },
                ],
            ],
        }),
    )

client.module
    .rule('fonts')
    .test(/\.(woff2?)$/)
    .set('type', 'asset')
    .set('generator', {
        filename: 'fonts/[name].[hash][ext]',
    })

client.module
    .rule('images')
    .test(/\.(jpe?g|png|webp|ico)$/)
    .set('type', 'asset')
    .set('generator', {
        filename: 'images/[name].[hash][ext]',
    })

client.module
    .rule('videos')
    .test(/\.(mp4|webm)$/)
    .set('type', 'asset')
    .set('generator', {
        filename: 'videos/[name].[hash][ext]',
    })

client.resolve
    .enforceExtension(false)
    .extensions.add('.ts')
    .add('.tsx')
    .add('.wasm')
    .add('.mjs')
    .add('.js')
    .add('.jsx')
    .add('.json')
    .end()
    .modules.add(path.resolve('src'))
    .add(path.resolve('vendor'))
    .add(path.resolve('node_modules'))
    .end()

client.plugin('define').use(webpack.DefinePlugin, [
    {
        __SSR__: JSON.stringify(false),
    },
])

client.plugin('loadable').use(LoadablePlugin)

client.set('experiments', {
    asset: true,
})

server.name('server').context(path.resolve('./src')).target('node')

server.entry('main').add('./server')

server.output
    .filename('app.js')
    .libraryTarget('commonjs-module')
    .path(path.resolve('dist'))
    .pathinfo(false)

server.module
    .rule('babel')
    .test(/\.(j|mj|t)sx?$/)
    .exclude.add(/node_modules/)
    .end()
    .use('babel')
    .loader('babel-loader')
    .options(
        merge(BABEL_OPTIONS, {
            presets: [
                [
                    '@babel/env',
                    {
                        exclude: [
                            'transform-async-to-generator',
                            'transform-regenerator',
                        ],
                        modules: 'commonjs',
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ],
            plugins: [
                [
                    [
                        'polyfill-corejs3',
                        {
                            method: 'entry-global',
                            targets: {
                                node: 'current',
                            },
                        },
                    ],
                    [
                        'polyfill-regenerator',
                        {
                            method: 'usage-pure',
                            targets: {
                                node: 'current',
                            },
                        },
                    ],
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
            ],
        }),
    )

server.module
    .rule('fonts')
    .test(/\.(woff2?)$/)
    .set('type', 'asset')
    .set('generator', {
        filename: 'fonts/[name].[hash][ext]',
    })

server.module
    .rule('images')
    .test(/\.(jpe?g|png|webp|ico)$/)
    .set('type', 'asset')
    .set('generator', {
        filename: 'images/[name].[hash][ext]',
    })

server.module
    .rule('videos')
    .test(/\.(mp4|webm)$/)
    .set('type', 'asset')
    .set('generator', {
        filename: 'videos/[name].[hash][ext]',
    })

server.resolve
    .enforceExtension(false)
    .extensions.add('.ts')
    .add('.tsx')
    .add('.wasm')
    .add('.mjs')
    .add('.js')
    .add('.jsx')
    .add('.json')
    .end()
    .modules.add(path.resolve('src'))
    .add(path.resolve('vendor'))
    .add(path.resolve('node_modules'))
    .end()

server.plugin('define').use(webpack.DefinePlugin, [
    {
        __SSR__: JSON.stringify(false),
    },
])

server.plugin('loadable').use(LoadablePlugin)

server.externals([
    (_context, request, callback) => {
        if (/stats\.json$/.test(request)) {
            return callback(null, `commonjs ${ request }`)
        }
        callback()
    },
    nodeExternals(),
])

server.set('experiments', {
    asset: true,
})

module.exports = { client, server }

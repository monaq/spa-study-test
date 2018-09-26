
import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import serve from 'rollup-plugin-serve'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)

let plugins = [
  babel(babelrc()),
  serve('dist')
];

export default {
  entry: 'index.js',
  plugins: plugins,
  external: external,
  globals: { jquery: '$' },
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'rollupStarterProject',
      sourceMap: true
    }
  ]
};
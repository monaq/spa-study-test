import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import resolve from 'rollup-plugin-node-resolve'
import jquery from 'jquery'

const pkg = require('./package.json')

const plugins = [
  babel({
    exclude: 'node_modules/**' // only transpile our source code
  }),
  resolve(),
  serve({
    open: true,
    contentBase: 'dist',
    host: 'localhost',
    port: 10001
  })
]

module.exports = {
  input: './src/index.js',
  plugins: plugins,
  output: {
    file: pkg.main,
    format: 'iife',
    name: 'spaTest',
    globals: {
      jquery: '$'
    }
  },
}
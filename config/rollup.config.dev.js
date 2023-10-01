import { nodeResolve } from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
const pkg = require('../package.json')

export default {
  input: 'src/index.ts',
  output: {
    file: 'dev/index.umd.js',
    format: 'umd',
    name: 'myff',
    banner: `/* ${pkg.name} ${pkg.version} @${pkg.author} ${pkg.repository.url} */`,
  },
  plugins: [
    nodeResolve(),
    typescript(),
    serve({
      open: true,
      openPage: '/dev/index.html',
      host: 'localhost',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    livereload('dev'),
    json(),
  ],
}

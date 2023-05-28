/* eslint-disable max-len */
import terser from '@rollup/plugin-terser'
import banner2 from 'rollup-plugin-banner2'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'
import typescript from 'rollup-plugin-typescript2'
import jsCleanup from 'js-cleanup'

const pkg = require('../package.json')
const fs = require("fs")
const path = require("path")

const targets = [
  {
    input: './src/index.ts',
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration:false
          },
        },
      }),
      terser(),
      banner2(
        () => `/**
   * ${pkg.name} v${pkg.version}
   * ${pkg.description}
   * ${pkg.repository.url}
   * (c) 2021-${new Date().getFullYear()} @${pkg.author
          } may be freely distributed under the MIT license
   */
  `
      ),
      json(),
      copy({
        targets: [
          {
            src: [
              'CHANGELOG.md',
              'LICENSE',
              'README.md',
              'package.json',
            ],
            dest: 'dist',
          },
        ],
      }),
    ],
    output: [
      {
        file: './dist/index.umd.js',
        format: 'umd',
        name: 'myff'
      }
    ],
  }
]

const files = fs.readdirSync('./dist')
  files.forEach((item, index) => {
    var fullpath = path.join('./dist', item)
    if(item.endsWith('.js') && !item.startsWith('index')){
      const funcStr = fs.readFileSync(`${fullpath}`, 'utf8')
      fs.writeFileSync(fullpath, jsCleanup(funcStr).code)
    }    
  })

export default targets

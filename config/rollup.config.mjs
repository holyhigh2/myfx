/* eslint-disable max-len */
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import fs from 'fs'
import path from 'path'
import banner2 from 'rollup-plugin-banner2'
import clear from 'rollup-plugin-clear'
import copy from 'rollup-plugin-copy'
import typescript from 'rollup-plugin-typescript2'
const text = fs.readFileSync('./package.json', 'utf8')
const pkg = JSON.parse(text)

function readfilelist(dir, fileslist = []) {
  const files = fs.readdirSync(dir)
  files.forEach((item, index) => {
    var fullpath = path.join(dir, item)
    const stat = fs.statSync(fullpath)
    if (stat.isDirectory()) {
      readfilelist(path.join(dir, item), fileslist)
    } else {
      fileslist.push([fullpath, item])
    }
  })
  return fileslist
}

const targets = [
  {
    input: 'src/index.ts',
    plugins: [
      clear({
        targets: ['dist'],
        watch: true,
      }),
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: './dist/types',
          },
        },
      }),
      commonjs(),
      // terser(),
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
        file: 'dist/index.esm.mjs',
        format: 'esm'
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'myff'
      }
    ],
  }
]
//compile each module
readfilelist('./src/_modules').forEach((path) => {
  const fileName = path[1]
  const dirName = fileName.replace('.ts', '')
  if (fileName === 'func.ts') return;

  targets.push({
    input: 'src/_modules/' + fileName,
    plugins: [
      typescript({
        tsconfigOverride: {
          // useTsconfigDeclarationDir: true,
          compilerOptions: {
            declaration: false,
            // declarationDir: './dist/'+fileName+'/types',
          },
        },
      }),
      commonjs(),
      // terser(),
      banner2(
        () => `/**
   * ${pkg.name}/${dirName} v${pkg.version}
   * ${pkg.description}
   * ${pkg.repository.url}
   * (c) 2021-${new Date().getFullYear()} @${pkg.author
          } may be freely distributed under the MIT license
   */
  `
      ),
      json()
    ],
    output: [
      {
        file: 'dist/' + dirName + '/index.js',
        format: 'esm'
      },
    ]
  })
})

export default targets

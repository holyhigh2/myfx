import typescript from 'rollup-plugin-typescript2'
const nodeResolve = require('@rollup/plugin-node-resolve')
import json from '@rollup/plugin-json'

const targets = [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        tsconfigOverride: {
          include:["src/index.ts"],
          compilerOptions: {
            declaration:false
          },
        },
      }),
      nodeResolve(),
      json()
    ],
    output: [
      {
        file: 'test/index.js',
        format: 'umd',
        name: 'myff'
      }
    ],
  }
]

export default targets

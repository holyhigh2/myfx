import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
const nodeResolve = require('@rollup/plugin-node-resolve')

const targets = [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        tsconfigOverride: {
          include: ["src/index.ts"],
          compilerOptions: {
            declaration: false
          },
        },
      }),
      nodeResolve(),
      json()
    ],
    output: [
      {
        file: 'test/index.js',
        format: 'esm'
      }
    ],
  }
]

export default targets

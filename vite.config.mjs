import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * ${pkg.repository.url}
 * (c) 2021-${new Date().getFullYear()} @${pkg.author} may be freely distributed under the MIT license
 */
`

function versionReplace() {
  return {
    name: 'myfx-version-replace',
    apply: 'build',
    closeBundle() {
      const files = [
        path.join(__dirname, 'dist/index.esm.mjs'),
        path.join(__dirname, 'dist/index.umd.js'),
        path.join(__dirname, 'dist/index.d.ts'),
      ]
      for (const file of files) {
        if (!fs.existsSync(file)) continue
        let text = fs.readFileSync(file, 'utf8')
        if (file.endsWith('.d.ts')) text = stripTrailingDuplicateNamespaces(text)
        text = text.replaceAll('"#ver#"', JSON.stringify(pkg.version))
        text = text.replaceAll("'#ver#'", JSON.stringify(pkg.version))
        fs.writeFileSync(file, text)
      }
    },
  }
}

// Workaround: api-extractor can emit duplicate local `declare namespace X { ... }`
// blocks after its terminal `export { }` directive. Merging them with the exported
// declarations triggers TS2395 in dist/index.d.ts.
// See qmhc/unplugin-dts#352 and microsoft/rushstack#4807.
function stripTrailingDuplicateNamespaces(text) {
  const re = /\bexport \{\s*\}\s*;?/g
  let last = null
  let m
  while ((m = re.exec(text))) last = m
  if (!last) return text
  const end = last.index + last[0].length
  const tail = text.slice(end)
  if (!tail.trim()) return text
  const head = text.slice(0, end)
  const names = [...tail.matchAll(/declare namespace ([A-Za-z_$][\w$]*)/g)].map((x) => x[1])
  const allDuplicated =
    names.length > 0 && names.every((n) => head.includes(`export declare namespace ${n}`))
  if (!allDuplicated) {
    console.warn('[myfx] unexpected declarations after final export { } in index.d.ts; left unchanged')
    return text
  }
  return head.replace(/\s+$/, '\n')
}

export default defineConfig(({ mode }) => {
  const isUmd = mode === 'umd'
  const isDev = mode === 'dev'

  return {
    appType: 'custom',
    plugins: [isDev ? null : isUmd ? null : dts({
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'test/**'],
      tsconfigPath: './tsconfig.build.json',
      bundleTypes: true,
      insertTypesEntry: false,
      copyDtsFiles: false,
    }), versionReplace()].filter(Boolean),
    build: {
      outDir: isDev ? 'dev' : 'dist',
      emptyOutDir: isDev || isUmd ? false : true,
      minify: false,
      target: 'es2020',
      sourcemap: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: [isDev || isUmd ? 'umd' : 'es'],
        name: 'myfx',
        fileName: () => (isDev || isUmd ? 'index.umd.js' : 'index.esm.mjs'),
      },
      rollupOptions: {
        output: {
          exports: 'named',
          banner,
        },
      },
    },
  }
})

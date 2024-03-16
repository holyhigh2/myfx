// const dts = require("rollup-plugin-dts")
import { dts } from 'rollup-plugin-dts'
import fs from 'fs'
const text = fs.readFileSync('./package.json', 'utf8')
const pkg = JSON.parse(text)

const targets = [{
  input: "./dist/types/index.d.ts",
  output: [{ file: "dist/index.d.ts", format: "es" }],
  plugins: [dts()],
}
]

const moduleNames = []
const files = fs.readdirSync('./dist/types/_modules')
files.forEach((item, index) => {
  if(item == 'func.d.ts')return

  const dirName = item.replace('.d.ts', '')
  moduleNames.push(dirName)
})

moduleNames.forEach(dirName => {
  targets.push({
    input: "./dist/types/_modules/" + dirName +".d.ts",
    output: [{ file: "dist/" + dirName +"/index.d.ts", format: "es" }],
    plugins: [dts()],
  })
})

process.on('exit', () => {
  fs.rmSync('./dist/types', { recursive: true })

  let text = fs.readFileSync('./dist/index.d.ts', 'utf8')
  text = text.replace('"#ver#"',`"${pkg.version}"`)
  fs.writeFileSync(`./dist/index.d.ts`, text)

  text = fs.readFileSync('./dist/index.esm.js', 'utf8')
  text = text.replace('"#ver#"',`"${pkg.version}"`)
  fs.writeFileSync(`./dist/index.esm.js`, text)

  text = fs.readFileSync('./dist/index.umd.js', 'utf8')
  text = text.replace('"#ver#"',`"${pkg.version}"`)
  fs.writeFileSync(`./dist/index.umd.js`, text)
})

export default targets

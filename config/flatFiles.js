const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

function buildEntries(dir) {
  const files = fs.readdirSync(dir)

  //扁平化
  files.forEach((item, index) => {
    var fullpath = path.join('dist', item)
    const stat = fs.statSync(fullpath)
    if (!stat.isDirectory()) {
      return
    }

    fs.readdirSync(fullpath).forEach(fileName => {
      fs.copyFileSync(
        path.join(fullpath, fileName),
        './dist/' + fileName
      )
    })
    fs.rmSync(fullpath, { recursive: true })
  })

  //处理引用路径
  fs.readdirSync(dir).forEach((item, index) => {
    var fullpath = path.join('dist', item)
    let funcStr = fs.readFileSync(`${fullpath}`, 'utf8')
    funcStr = funcStr.replace('../types','./types').replace(/\.?\.\/[^\/\n]+?\//img, './').replace(/('|")\.\.\/([^\/\n"']+?)\1/img, '$1./$2$1')
    fs.writeFileSync(fullpath, funcStr)
  })
}
buildEntries('./dist')

//update version
const indexStr = fs.readFileSync(`./dist/index.js`, 'utf8')
fs.writeFileSync(`./dist/index.js`, indexStr.replace(/VERSION = '[^']+?';\s*\/\/version/,`VERSION = '${pkg.version}';//version`))

const indexStr2 = fs.readFileSync(`./src/index.ts`, 'utf8')
fs.writeFileSync(`./src/index.ts`, indexStr2.replace(/VERSION = '[^']+?';\s*\/\/version/,`VERSION = '${pkg.version}';//version`))
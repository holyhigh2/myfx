const fs = require('fs')
const path = require('path')

//创建模块
function buildEntries(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((item, index) => {
    var fullpath = path.join(dir, item)
    const stat = fs.statSync(fullpath)
    if (stat.isDirectory()) {
      const funcs = fs.readdirSync(fullpath)

      let txt = ''
      let funcAry = []
      funcs.forEach(fn => {
        const funcName = fn.replace('.ts', '')
        funcAry.push(funcName)
        txt += `import ${funcName} from './${item}/${funcName}'\n`

      });
      txt = txt.replace(/export default .*\n/, '')
      txt += `\nexport {${funcAry.join(',')}}`

      fs.writeFileSync(fullpath + '.ts', txt)
    }
  })
}
buildEntries('./src')
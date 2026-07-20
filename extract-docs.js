const fs = require('fs');
const path = require('path');
const { Project, Node } = require('ts-morph');

const srcDir = path.join(__dirname, 'src');
const outputFile = path.join(__dirname, 'doc/functions.json');


function extractAll() {
  const project = new Project({
    tsConfigFilePath: path.join(__dirname, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true,
  });

  project.addSourceFilesAtPaths(`${srcDir}/**/*.ts`);

  const allFunctions = {};
  const modules = getModules();

  for (const module of modules) {
    const modulePath = path.join(srcDir, module);
    if (!fs.existsSync(modulePath)) continue;
    const files = fs.readdirSync(modulePath).filter(f =>
      f.endsWith('.ts') && !f.includes('.test.') && f !== 'types.ts'
    );

    const funcs = [];
    const processedNames = new Set();

    for (const file of files) {
      const filePath = path.join(modulePath, file);
      const sourceFile = project.addSourceFileAtPath(filePath);

      let exFns = sourceFile.getFunctions()
      if (exFns.length < 1) {
        //解析源文件
        let srcFilePath = sourceFile.getImportDeclarations()[0].getModuleSpecifier().getText()
        srcFilePath = path.join(modulePath, srcFilePath.replace(/^['"]|['"]$/g, ''))

        const sourceFile2 = project.addSourceFileAtPath(srcFilePath + '.ts');
        exFns = sourceFile2.getFunctions()
      }

      for (const func of exFns) {
        if (func.isExported()) {
          let struct = func.getStructure()
          const doc = struct.docs[0]
          let signatures = []
          let params = []
          let signature = struct.name
          if (struct.typeParameters?.length > 0) {
            signature += `<${struct.typeParameters.map(t => t.name).join(',')}>`
          }

          signature += '('
          let addedParams = 0
          if (struct.parameters?.length > 0) {
            struct.parameters.forEach(p => {
              let regExp = new RegExp(`(\\s|^)${p.name}\\s`)
              let paramDesc = doc?.tags?.find(t => t.tagName == 'param' && regExp.test(t.text))?.text || ''
              params.push({
                name: p.name,
                type: p.type,
                desc: paramDesc.replace(regExp, ''),
                isRestParameter: p.isRestParameter,
                defaultValue: p.initializer,
                hasQuestionToken: p.hasQuestionToken
              })
              signature += (addedParams++ > 0 ? ', ' : '') + (p.isRestParameter ? '...' : '') + p.name + (p.hasQuestionToken ? '?' : '') + ': ' + p.type + (p.initializer?.length > 0 ? ' = ' + p.initializer : '')
            })
          }

          if (struct.overloads.length > 0) {
            signatures = func.getOverloads().map(o => o.getText()
              .replace(/[\r\n]/g, '')
              .replace(/\(\s*(\w)/mg, '($1')
              .replace(/\,\s*(\w)/mg, ', $1')
              .replace(/>\s*\)/mg, '>)')
              .replace(/\)\s*\|/mg, ') |')
            )
          } else {
            signature += ')'
            if (struct.returnType) {
              signature += ': ' + struct.returnType
              signatures.push(signature)
            }
          }
          funcs.push({
            name: struct.name,
            params,
            module,
            desc: doc?.description || '',
            returnType: struct.returnType,
            returns: doc?.tags?.find(t => t.tagName == 'returns')?.text || '',
            example: doc?.tags?.find(t => t.tagName == 'example')?.text || '',
            since: doc?.tags?.find(t => t.tagName == 'since')?.text || '',
            effect: doc?.tags?.find(t => t.tagName == 'effect')?.text || '',
            signatures
          });
        }
      }
    }

    if (funcs.length > 0) {
      allFunctions[module] = funcs;
    } else {
      console.warn(`模块 "${module}" 未提取到任何函数。`);
    }
  }

  return allFunctions;
}

function getModules() {
  if (!fs.existsSync(srcDir)) {
    console.error(`错误: 找不到 src 目录: ${srcDir}`);
    process.exit(1);
  }
  const items = fs.readdirSync(srcDir);
  const modules = [];
  for (const item of items) {
    const itemPath = path.join(srcDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      if (!item.startsWith('_') && !['__tests__', '__mocks__', 'types', 'test', 'internal'].includes(item)) {
        modules.push(item);
      }
    }
  }
  return modules;
}

console.log('开始提取 myfx 函数文档（正则解析版）...');
const result = extractAll();

let total = 0;
const mods = Object.keys(result);
for (const mod of mods) {
  total += result[mod].length;
  console.log(`  - ${mod}: ${result[mod].length} 个函数`);
}
console.log(`提取完成！共 ${total} 个函数，分布在 ${mods.length} 个模块中。`);

fs.mkdirSync(path.join(__dirname, 'doc'))
fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
console.log(`数据已保存到: ${outputFile}`);
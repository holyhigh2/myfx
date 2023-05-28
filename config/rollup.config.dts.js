const dts = require("rollup-plugin-dts")

const targets = [
  {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts.default()],
  }
]

const moduleNames = ['array', 'collection', 'datetime', 'functions', 'is', 'math', 'number', 'object', 'string', 'tree', 'utils']
moduleNames.forEach(dirName => {
  targets.push({
    input: "./dist/" + dirName +".d.ts",
    output: [{ file: "dist/" + dirName +".d.ts", format: "es" }],
    plugins: [dts.default()],
  })
})

export default targets

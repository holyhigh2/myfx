---
name: build-verify
description: 构建 myfx 项目并验证产物完整性。当用户要求构建、打包、检查构建输出、发布前验证时使用此 skill。
---

# 构建验证流程

## 命令

```bash
npm run build
```

该命令并行执行 4 个构建任务：
1. `build.chainfx.mjs` — 函数链相关处理
2. `build.modules.mjs` — 各模块独立打包
3. `rollup.config.mjs` — UMD/ESM 主包构建
4. `rollup.config.dts.mjs` — TypeScript 声明文件生成

## 构建产物

构建完成后检查以下文件是否存在：

| 产物 | 路径 | 说明 |
|------|------|------|
| UMD 包 | `dist/index.umd.js` | 浏览器/Node 通用 |
| ESM 包 | `dist/index.esm.mjs` | ES Module 格式 |
| 类型声明 | `dist/index.d.ts` | TypeScript 类型定义 |

**重要**: `dist/` 目录不应提交到 git（已在 `.gitignore` 中排除）。

## 执行步骤

### 1. 清理旧产物（可选）

如果之前有残留构建问题：
```bash
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
```

### 2. 执行构建

```bash
npm run build
```

### 3. 验证产物

检查 `dist/` 目录是否包含上述 3 个文件，且文件大小合理（非 0 字节）。

### 4. 快速 smoke test

用 Node 快速验证 ESM 产物可正常导入：

```bash
node -e "import('./dist/index.esm.mjs').then(m => console.log('ESM OK, functions:', Object.keys(m.default).length))"
```

### 5. 常见问题

| 现象 | 可能原因 | 解决 |
|------|----------|------|
| DTS 生成失败 | 新增函数缺少 JSDoc 或类型不完整 | 补充类型定义和 JSDoc |
| Rollup 报错 | import 路径错误或循环依赖 | 检查 `_modules/*.ts` 的导出 |
| 模块打包缺失 | `build.modules.mjs` 未扫描到新文件 | 确认源文件在正确目录下 |

## 完整验证序列

发布前或重大修改后，依次执行：

```bash
npm run jest     # 1. 测试
npm run build    # 2. 构建
npm run doc      # 3. 文档生成
```

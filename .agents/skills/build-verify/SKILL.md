---
name: build-verify
description: 构建 myfx 项目并验证产物完整性。当用户要求构建、打包、检查构建输出、发布前验证时使用此 skill。
---

# 构建验证流程

## 命令

```bash
npm run build
```

该命令依次执行 3 个构建步骤：
1. `build.chainfx.mjs` — 扫描模块目录，重新生成 `src/chain.ts` 中的 ChainFx 方法
2. `vite build` — 构建 ESM 包 + TypeScript 声明文件（vite-plugin-dts）
3. `vite build --mode umd` — 构建 UMD 包

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
| Vite/Rollup 报错 | import 路径错误或循环依赖 | 检查 `src/index.ts` 的 import/export 列表 |
| 函数未出现在函数链 | `src/chain.ts` 未重新生成 | 运行 `npm run build`（chainfx 会自动重生成） |

## 完整验证序列

发布前或重大修改后，依次执行：

```bash
npm run jest     # 1. 测试
npm run build    # 2. 构建
npm run doc      # 3. 文档生成
```

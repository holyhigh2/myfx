---
name: run-tests
description: 运行 myfx 项目的测试套件并分析结果。当用户要求运行测试、检查测试结果、验证修改是否正确、回归测试时使用此 skill。
---

# 运行测试流程

## 命令

```bash
npm run jest
```

该命令会：
1. 用 rollup 打包 Jest 测试配置
2. 执行 `test/index.spec.ts`，消费 `test/cases.*.ts` 中的所有测试数据

## 测试架构

- **测试框架**: Jest
- **测试入口**: `test/index.spec.ts` — 通用驱动，遍历 `test/cases.{module}.ts` 中 `Datas` 对象的所有 key
- **用例格式**: `test/cases.{module}.ts` 中每个函数对应一个数组 `[[args..., expected], ...]`
- **命名约定**: `test/cases.{module}.ts`（cases.array.ts, cases.object.ts 等）

## 执行步骤

### 1. 运行完整测试

```bash
npm run jest
```

### 2. 分析输出

测试结果按以下方式解读：

| 状态 | 含义 | 下一步 |
|------|------|--------|
| ✅ PASS | 全部通过 | 继续构建验证 |
| ❌ FAIL | 部分失败 | 定位失败函数，检查实现 vs 测试数据 |
| ⚠️ 编译错误 | TypeScript/Rollup 报错 | 先修复编译问题再重跑 |

### 3. 常见失败模式排查

- **实现有误**: 对比 `src/{module}/{function}.ts` 逻辑与预期输出
- **测试数据有误**: 检查 `test/cases.{module}.ts` 中 expected 是否正确
- **类型问题**: 新增函数的泛型参数可能影响已有函数行为

### 4. 验证后构建

```bash
npm run build
```

构建成功才算完整验证通过。

## 快速检查

如需快速验证单个函数，可在 Jest 输出中过滤函数名：

```bash
npm run jest 2>&1 | Select-String "functionName"
```

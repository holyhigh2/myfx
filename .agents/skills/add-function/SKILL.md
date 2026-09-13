---
name: add-function
description: 为 myfx 工具库添加新函数。当用户要求添加、新增、创建新的工具函数时使用此 skill，包括新增数组方法、对象操作、类型检查等任何模块的函数。
---

# 添加新函数流程

## 前置确认

在开始编码前，先确认以下信息：

1. **函数所属模块** — array / collection / datetime / function / is / math / number / object / string / template / tree / utils
2. **函数名称** — 使用 camelCase，保持简洁描述性
3. **功能边界** — 纯函数？是否修改输入？依赖哪些已有函数？

如果以上信息不明确，先向用户提问。

## 实现步骤

### 1. 创建源文件

在对应模块目录下创建 `src/{module}/{functionName}.ts`。

模板（参考现有函数风格，如 `src/array/append.ts`）：

```typescript
import isXxx from "../is/isXxx";  // 需要的依赖

/**
 * 中文描述函数用途
 *
 * @effect 是否修改原数组/对象：标注 "修改原数组" 或省略（纯函数）
 *
 * @example
 * // 示例代码和注释结果
 * _.functionName(args)
 * //=> expected
 *
 * @param paramName 参数说明
 * @returns 返回值说明
 */
function functionName<T>(paramName: Type, ...): ReturnType {
  // 实现逻辑
}

export default functionName;
```

**编码规范要点**：
- 默认导出（`export default`），非命名导出
- 从相对路径引入依赖：`../collection/toArray`、`../is/isArray` 等
- 优先复用已有函数（如 `toArray`、`isEqual`、`isNil`），不重复实现
- 保持零外部依赖

### 2. 注册模块导出

编辑 `src/_modules/{module}.ts`，在顶部添加 import，在底部 export 中添加导出：

```typescript
import functionName from '../{module}/functionName'
// ...其他已有 import

export {..., functionName}
```

### 3. 添加测试用例

编辑 `test/cases.{module}.ts`，在 `Datas` 对象中添加测试数据：

```typescript
const Datas: Record<string, any[]> = {
  // ...已有测试
  functionName: [
    [arg1, arg2, expected],     // 用例 1
    [arg3, arg4, expected2],    // 用例 2
  ],
};
```

测试用例格式：数组中每项为 `[...输入参数, 期望输出]`，由 `test/index.spec.ts` 自动消费。

### 4. 验证

```bash
# 运行测试，确保新函数通过
npm run jest

# 构建项目，确保无类型/打包错误
npm run build
```

## 检查清单

- [ ] 源文件 JSDoc 包含中文描述、`@example`、`@param`、`@returns`
- [ ] 依赖路径使用相对路径（如 `../is/isArray`）
- [ ] `_modules/{module}.ts` 已添加 import 和 export
- [ ] `test/cases.{module}.ts` 包含至少 1 组测试用例
- [ ] `npm run jest` 全部通过
- [ ] `npm run build` 无报错
- [ ] 未引入任何外部依赖

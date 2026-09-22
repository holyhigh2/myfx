# My=f(x)
![npm](https://img.shields.io/npm/v/myfx?style=plastic)
![NPM](https://img.shields.io/npm/l/myfx)

```ts
//object
_.each<string, string>({ 1: 'a', 2: 'b', 3: 'c' }, (v,k)=>{})
//dom list
_.each<HTMLElement>(document.body.children, (el)=>{})
//array
_.each([1, 2, 3], num=>{})
//set
_.each(new Set([1, 2, 3]), num=>{
    if(...)
        return false// 可以随时中断循环
})
```

> 中文 | [English](./README.md)

## Myfx
Myfx是一个模块化的工具函数库，具有更高的性能、更丰富的函数、更直观的声明...

- [📑 文档](https://holyhigh2.github.io/myfx/)

## 特性
- 用于集合及其他模块的统一化接口
- 超过**200**个纯函数可供使用
- 惰性计算
- 树操作API
- 完整的日期/数字格式化器
- [查看更多...](https://holyhigh2.github.io/myfx/api/readme/)

## 快速上手
1. 安装
```sh
npm i myfx
```
2. 导入
```ts
import _ from 'myfx'
//or
import {each} from 'myfx'
//or
import _ from 'https://cdn.skypack.dev/myfx'
```

> 自 v2.0.0 起，子路径导出（`myfx/collection` 等）已移除，请改用 `myfx` 的命名导入。

## 开发
1. 使用 `jest` 执行测试
2. 使用 `build` 进行打包（Vite：ESM + UMD + d.ts）
3. 使用 `doc` 生成tsdoc
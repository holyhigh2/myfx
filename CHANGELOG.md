# Changelog

## [1.5.0] - 2024/12/21
### Add
- is -> isNode 判断是否Node
### Change
- isMatchWith 增加Node、Function类型判断
- isEqualWith 增加isElement、isFunction内置类型判断

## [1.4.0] - 2024/4/26
### Add
- function -> debounce, throttle
### Change
- arrayToTree 总是会初始化childrenKey属性

## [1.3.0] - 2024/1/14
### Add
- ChainFx -> 用于函数链提示
### Change
- 部分函数新增泛型
- 必须用chain()函数开启函数链
- 修复mixin逻辑错误

## [1.2.0] - 2024/1/3
### Add
- datetime -> formatDate(new patterns)

## [1.1.0] - 2023/10/1
### Add
- math -> minmax
### Optimize
- tree apis
- rollup

## [1.0.0] - 2023/5/28
initial commit
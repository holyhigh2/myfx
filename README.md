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
        return false// you can break the loop at any time
})
```
> English | [中文](./README_ZH.md)

## Myfx
Myfx is a modular utility library with more utils, higher performance and simpler declarations

- [📑 Documentation](https://holyhigh2.github.io/myfx/)

## Features
- Unified interface for collections and other modules
- **200+** Pure functions
- Lazy evaluation
- Tree APIs
- Full dateTime/number formatter
- [and more...](https://holyhigh2.github.io/myfx/api/readme/)

## Quick start
1. install
```sh
npm i myfx
```
2. import
```ts
import _ from 'myfx'
//or
import {each} from 'myfx'
//or
import {each,map} from 'myfx/collection'
//or
import _ from 'https://cdn.skypack.dev/myfx'
```

## Development
1. use `test` to do jest 
2. use `build` to rollup myfx
3. use `doc` to gen tsdoc

/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/**
 * 函数链操作相关函数
 * @author holyhigh
 */

import _eq from '../_eq'
import { Collection, NonFuncItee, UnknownMapKey } from '../types'
import _identity from '../utils/identity'
import { range, reverse, slice } from './array'
import { size, toArray, map, filter, eachRight, each, tail, take, first, head, last } from './collection'
import { tap } from './function'
import { isArrayLike, isDefined, isFunction, isUndefined } from './is'
import { get } from './object'
import { split } from './string'
import { iteratee } from './utils'

/**
 * chain 函数集
 */
export class ChainFx {
append<T>(...values: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_append').call(this,...arguments)}
chunk<T>(size: number = 1):FuncChain<any>{return get<Function>(FuncChain.prototype,'_chunk').call(this,...arguments)}
compact<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_compact').call(this,...arguments)}
concat():FuncChain<any>{return get<Function>(FuncChain.prototype,'_concat').call(this,...arguments)}
except<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_except').call(this,...arguments)}
fill<T>(value: any,start: number = 0,end?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_fill').call(this,...arguments)}
findIndex<T>(predicate: ((value: T, index: string | number, array: T[]) => boolean) | NonFuncItee,fromIndex?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_findIndex').call(this,...arguments)}
findLastIndex<T>(predicate: ((value: T, index: string | number, array: T[]) => boolean) | NonFuncItee,fromIndex?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_findLastIndex').call(this,...arguments)}
flat<T>(depth: number = 1):FuncChain<any>{return get<Function>(FuncChain.prototype,'_flat').call(this,...arguments)}
flatDeep<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_flatDeep').call(this,...arguments)}
insert<T>(index: number,...values: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_insert').call(this,...arguments)}
intersect<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_intersect').call(this,...arguments)}
join(separator?: string):FuncChain<any>{return get<Function>(FuncChain.prototype,'_join').call(this,...arguments)}
pop<T>(index?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_pop').call(this,...arguments)}
pull<T>(...values: T[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_pull').call(this,...arguments)}
range(end?: number,step?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_range').call(this,...arguments)}
remove<T>(predicate: ((value: T, index: string | number, array: T[]) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_remove').call(this,...arguments)}
reverse<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_reverse').call(this,...arguments)}
slice<T>(begin?: number,end?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_slice').call(this,...arguments)}
sortedIndex<T>(value: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_sortedIndex').call(this,...arguments)}
sortedIndexBy<T>(value: any,itee?: ((value: any) => any) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_sortedIndexBy').call(this,...arguments)}
union<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_union').call(this,...arguments)}
uniq<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_uniq').call(this,...arguments)}
uniqBy<T>(itee?: ((value: T, index: UnknownMapKey) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_uniqBy').call(this,...arguments)}
unzip():FuncChain<any>{return get<Function>(FuncChain.prototype,'_unzip').call(this,...arguments)}
without<T>(...values: T[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_without').call(this,...arguments)}
zip():FuncChain<any>{return get<Function>(FuncChain.prototype,'_zip').call(this,...arguments)}
zipObject(values: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_zipObject').call(this,...arguments)}
zipWith():FuncChain<any>{return get<Function>(FuncChain.prototype,'_zipWith').call(this,...arguments)}
countBy<V,K extends string | number | symbol>(itee?: ((value: V) => K) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_countBy').call(this,...arguments)}
every<V,K extends string | number | symbol>(predicate: ((value: V, index: K, collection: Collection<V>) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_every').call(this,...arguments)}
filter<V,K extends string | number | symbol>(predicate: ((value: V, index: K, collection: Collection<V>) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_filter').call(this,...arguments)}
find<V,K extends string | number | symbol>(predicate: ((value: V, index: K, collection: Collection<V>) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_find').call(this,...arguments)}
findLast<V,K extends string | number | symbol>(predicate: ((value: V, index: K, collection: Collection<V>) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_findLast').call(this,...arguments)}
first<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_first').call(this,...arguments)}
flatMap<V,K extends string | number | symbol,U>(itee: ((value: V, index: K, collection: Collection<V>) => U | Promise<any>) | NonFuncItee,depth?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_flatMap').call(this,...arguments)}
flatMapDeep<V,K extends string | number | symbol,U>(itee: ((value: V, index: K, collection: Collection<V>) => U) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_flatMapDeep').call(this,...arguments)}
groupBy<V,U>(itee?: ((value: V) => UnknownMapKey) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_groupBy').call(this,...arguments)}
includes(value: any,fromIndex?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_includes').call(this,...arguments)}
initial<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_initial').call(this,...arguments)}
keyBy<V,K extends string | number | symbol>(itee?: ((value: V) => K) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_keyBy').call(this,...arguments)}
last<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_last').call(this,...arguments)}
map<V,K extends string | number | symbol,U>(itee: ((value: V, index: K, collection: Collection<V>) => U | Promise<any>) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_map').call(this,...arguments)}
partition<V,K extends string | number | symbol>(predicate: ((value: V, index: K, collection: Collection<V>) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_partition').call(this,...arguments)}
reduce<T,U>(callback: (accumulator: U, value: T, key: UnknownMapKey, collection: Collection<T>) => U,initialValue: U):FuncChain<any>{return get<Function>(FuncChain.prototype,'_reduce').call(this,...arguments)}
reject<V,K extends string | number | symbol>(predicate: ((value: V, index: K, collection: Collection<V>) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_reject').call(this,...arguments)}
sample<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_sample').call(this,...arguments)}
sampleSize<T>(count?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_sampleSize').call(this,...arguments)}
shuffle<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_shuffle').call(this,...arguments)}
size():FuncChain<any>{return get<Function>(FuncChain.prototype,'_size').call(this,...arguments)}
some<V,K extends string | number | symbol>(predicate: ((value: V, index: K, collection: Collection<V>) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_some').call(this,...arguments)}
sort<T>(comparator?: (a: T, b: T) => number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_sort').call(this,...arguments)}
sortBy<V,K extends string | number | symbol>(itee?: ((value: V, index: K) => any) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_sortBy').call(this,...arguments)}
tail<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_tail').call(this,...arguments)}
take<T>(length?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_take').call(this,...arguments)}
takeRight<T>(length?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_takeRight').call(this,...arguments)}
toArray<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_toArray').call(this,...arguments)}
addTime(amount: number,type?: string):FuncChain<any>{return get<Function>(FuncChain.prototype,'_addTime').call(this,...arguments)}
compareDate(date2: Date | string | number,type?: string):FuncChain<any>{return get<Function>(FuncChain.prototype,'_compareDate').call(this,...arguments)}
formatDate(pattern?: string):FuncChain<any>{return get<Function>(FuncChain.prototype,'_formatDate').call(this,...arguments)}
getDayOfYear():FuncChain<any>{return get<Function>(FuncChain.prototype,'_getDayOfYear').call(this,...arguments)}
getWeekOfMonth():FuncChain<any>{return get<Function>(FuncChain.prototype,'_getWeekOfMonth').call(this,...arguments)}
getWeekOfYear():FuncChain<any>{return get<Function>(FuncChain.prototype,'_getWeekOfYear').call(this,...arguments)}
isLeapYear():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isLeapYear').call(this,...arguments)}
isSameDay(date2: Date | string | number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_isSameDay').call(this,...arguments)}
now():FuncChain<any>{return get<Function>(FuncChain.prototype,'_now').call(this,...arguments)}
toDate():FuncChain<any>{return get<Function>(FuncChain.prototype,'_toDate').call(this,...arguments)}
after(count?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_after').call(this,...arguments)}
alt(interceptor1: Function,interceptor2: Function):FuncChain<any>{return get<Function>(FuncChain.prototype,'_alt').call(this,...arguments)}
bind<T extends (...args: any[]) => any>(thisArg: any,...args: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_bind').call(this,...arguments)}
bindAll<T extends Record<UnknownMapKey, any>>(...methodNames: (string | string[])[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_bindAll').call(this,...arguments)}
call(...args: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_call').call(this,...arguments)}
compose():FuncChain<any>{return get<Function>(FuncChain.prototype,'_compose').call(this,...arguments)}
debounce(wait: number,immediate: boolean = false):FuncChain<any>{return get<Function>(FuncChain.prototype,'_debounce').call(this,...arguments)}
delay(wait?: number,...args: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_delay').call(this,...arguments)}
fval<T>(args?: Record<string, any>,context?: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_fval').call(this,...arguments)}
once():FuncChain<any>{return get<Function>(FuncChain.prototype,'_once').call(this,...arguments)}
partial<T extends (...args: any[]) => any>(...args: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_partial').call(this,...arguments)}
tap<T>(interceptor: Function):FuncChain<any>{return get<Function>(FuncChain.prototype,'_tap').call(this,...arguments)}
throttle(wait: number,options?: {
    leading?: boolean;
    trailing?: boolean;
}):FuncChain<any>{return get<Function>(FuncChain.prototype,'_throttle').call(this,...arguments)}
isArray<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isArray').call(this,...arguments)}
isArrayLike<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isArrayLike').call(this,...arguments)}
isBlank():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isBlank').call(this,...arguments)}
isBoolean():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isBoolean').call(this,...arguments)}
isDate():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isDate').call(this,...arguments)}
isDefined():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isDefined').call(this,...arguments)}
isElement():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isElement').call(this,...arguments)}
isEmpty():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isEmpty').call(this,...arguments)}
isEqual(b: unknown):FuncChain<any>{return get<Function>(FuncChain.prototype,'_isEqual').call(this,...arguments)}
isEqualWith(b: any,comparator?: Function):FuncChain<any>{return get<Function>(FuncChain.prototype,'_isEqualWith').call(this,...arguments)}
isError():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isError').call(this,...arguments)}
isFinite():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isFinite').call(this,...arguments)}
isFunction():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isFunction').call(this,...arguments)}
isInteger():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isInteger').call(this,...arguments)}
isMap<K,V>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isMap').call(this,...arguments)}
isMatch<T extends Record<string | number | symbol, any>>(props: T):FuncChain<any>{return get<Function>(FuncChain.prototype,'_isMatch').call(this,...arguments)}
isMatchWith<T extends Record<string | number | symbol, any>>(props: T,comparator: Function = _eq):FuncChain<any>{return get<Function>(FuncChain.prototype,'_isMatchWith').call(this,...arguments)}
isNaN():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isNaN').call(this,...arguments)}
isNil():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isNil').call(this,...arguments)}
isNull():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isNull').call(this,...arguments)}
isNumber():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isNumber').call(this,...arguments)}
isObject<T extends object>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isObject').call(this,...arguments)}
isPlainObject():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isPlainObject').call(this,...arguments)}
isRegExp():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isRegExp').call(this,...arguments)}
isSafeInteger():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isSafeInteger').call(this,...arguments)}
isSet<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isSet').call(this,...arguments)}
isString():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isString').call(this,...arguments)}
isSymbol():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isSymbol').call(this,...arguments)}
isUndefined():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isUndefined').call(this,...arguments)}
isWeakMap<K extends object,V>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isWeakMap').call(this,...arguments)}
isWeakSet<T extends object>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_isWeakSet').call(this,...arguments)}
add(b: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_add').call(this,...arguments)}
divide(b: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_divide').call(this,...arguments)}
max():FuncChain<any>{return get<Function>(FuncChain.prototype,'_max').call(this,...arguments)}
mean():FuncChain<any>{return get<Function>(FuncChain.prototype,'_mean').call(this,...arguments)}
min():FuncChain<any>{return get<Function>(FuncChain.prototype,'_min').call(this,...arguments)}
minmax(max: number,value: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_minmax').call(this,...arguments)}
multiply(b: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_multiply').call(this,...arguments)}
randf(max?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_randf').call(this,...arguments)}
randi(max?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_randi').call(this,...arguments)}
subtract(b: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_subtract').call(this,...arguments)}
sum():FuncChain<any>{return get<Function>(FuncChain.prototype,'_sum').call(this,...arguments)}
formatNumber(pattern = '#,##0.00'):FuncChain<any>{return get<Function>(FuncChain.prototype,'_formatNumber').call(this,...arguments)}
gt(b: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_gt').call(this,...arguments)}
gte(b: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_gte').call(this,...arguments)}
inRange(start?: number,end?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_inRange').call(this,...arguments)}
lt(b: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_lt').call(this,...arguments)}
lte(b: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_lte').call(this,...arguments)}
toInteger():FuncChain<any>{return get<Function>(FuncChain.prototype,'_toInteger').call(this,...arguments)}
toNumber():FuncChain<any>{return get<Function>(FuncChain.prototype,'_toNumber').call(this,...arguments)}
assign(...sources: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_assign').call(this,...arguments)}
assignWith(...sources: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_assignWith').call(this,...arguments)}
clone<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_clone').call(this,...arguments)}
cloneDeep<T>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_cloneDeep').call(this,...arguments)}
cloneDeepWith<T>(handler?: (v: any, k: UnknownMapKey, obj: Record<UnknownMapKey, any>) => any,skip: (v: any, k: string | number | symbol) => boolean = () => false):FuncChain<any>{return get<Function>(FuncChain.prototype,'_cloneDeepWith').call(this,...arguments)}
cloneWith<T>(handler: (v: any, k: string | number | symbol) => any = _identity,skip: (v: any, k: string | number | symbol) => boolean = () => false):FuncChain<any>{return get<Function>(FuncChain.prototype,'_cloneWith').call(this,...arguments)}
defaults<T extends Record<UnknownMapKey, any>>(...sources: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_defaults').call(this,...arguments)}
defaultsDeep<T extends Record<UnknownMapKey, any>>(...sources: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_defaultsDeep').call(this,...arguments)}
eq(b: unknown):FuncChain<any>{return get<Function>(FuncChain.prototype,'_eq').call(this,...arguments)}
findKey<V>(predicate: ((value: V, index: UnknownMapKey, collection: any) => boolean) | NonFuncItee):FuncChain<any>{return get<Function>(FuncChain.prototype,'_findKey').call(this,...arguments)}
fromPairs():FuncChain<any>{return get<Function>(FuncChain.prototype,'_fromPairs').call(this,...arguments)}
functions():FuncChain<any>{return get<Function>(FuncChain.prototype,'_functions').call(this,...arguments)}
get<V>(path: Array<string | number> | string | number,defaultValue?: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_get').call(this,...arguments)}
has(key: UnknownMapKey):FuncChain<any>{return get<Function>(FuncChain.prototype,'_has').call(this,...arguments)}
keys():FuncChain<any>{return get<Function>(FuncChain.prototype,'_keys').call(this,...arguments)}
keysIn():FuncChain<any>{return get<Function>(FuncChain.prototype,'_keysIn').call(this,...arguments)}
merge<T extends Record<UnknownMapKey, any>>(...sources: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_merge').call(this,...arguments)}
mergeWith<T extends Record<UnknownMapKey, any>>(...sources: any[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_mergeWith').call(this,...arguments)}
omit(...props: (string | string[])[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_omit').call(this,...arguments)}
omitBy<V,K extends UnknownMapKey>(predicate?: (v: V, k: K) => boolean):FuncChain<any>{return get<Function>(FuncChain.prototype,'_omitBy').call(this,...arguments)}
pick(...props: (string | string[])[]):FuncChain<any>{return get<Function>(FuncChain.prototype,'_pick').call(this,...arguments)}
pickBy<V,K extends UnknownMapKey>(predicate?: (v: V, k: K) => boolean):FuncChain<any>{return get<Function>(FuncChain.prototype,'_pickBy').call(this,...arguments)}
prop():FuncChain<any>{return get<Function>(FuncChain.prototype,'_prop').call(this,...arguments)}
set(path: Array<string | number> | string | number,value: any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_set').call(this,...arguments)}
toObject():FuncChain<any>{return get<Function>(FuncChain.prototype,'_toObject').call(this,...arguments)}
toPairs():FuncChain<any>{return get<Function>(FuncChain.prototype,'_toPairs').call(this,...arguments)}
unset(path: Array<string | number> | string | number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_unset').call(this,...arguments)}
values():FuncChain<any>{return get<Function>(FuncChain.prototype,'_values').call(this,...arguments)}
valuesIn():FuncChain<any>{return get<Function>(FuncChain.prototype,'_valuesIn').call(this,...arguments)}
camelCase():FuncChain<any>{return get<Function>(FuncChain.prototype,'_camelCase').call(this,...arguments)}
capitalize():FuncChain<any>{return get<Function>(FuncChain.prototype,'_capitalize').call(this,...arguments)}
endsWith(searchStr: string,position?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_endsWith').call(this,...arguments)}
escapeRegExp():FuncChain<any>{return get<Function>(FuncChain.prototype,'_escapeRegExp').call(this,...arguments)}
indexOf(search: string,fromIndex?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_indexOf').call(this,...arguments)}
kebabCase():FuncChain<any>{return get<Function>(FuncChain.prototype,'_kebabCase').call(this,...arguments)}
lastIndexOf(search: string,fromIndex?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_lastIndexOf').call(this,...arguments)}
lowerCase():FuncChain<any>{return get<Function>(FuncChain.prototype,'_lowerCase').call(this,...arguments)}
lowerFirst():FuncChain<any>{return get<Function>(FuncChain.prototype,'_lowerFirst').call(this,...arguments)}
padEnd(len: number,padString?: string):FuncChain<any>{return get<Function>(FuncChain.prototype,'_padEnd').call(this,...arguments)}
padStart(len: number,padString?: string):FuncChain<any>{return get<Function>(FuncChain.prototype,'_padStart').call(this,...arguments)}
padZ(len: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_padZ').call(this,...arguments)}
pascalCase():FuncChain<any>{return get<Function>(FuncChain.prototype,'_pascalCase').call(this,...arguments)}
repeat(count: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_repeat').call(this,...arguments)}
replace(searchValue: RegExp | string,replaceValue: string | ((substring: string, ...args: any[]) => string)):FuncChain<any>{return get<Function>(FuncChain.prototype,'_replace').call(this,...arguments)}
replaceAll(searchValue: RegExp | string | Record<string, any>,replaceValue?: string | ((substring: string, ...args: any[]) => string)):FuncChain<any>{return get<Function>(FuncChain.prototype,'_replaceAll').call(this,...arguments)}
snakeCase():FuncChain<any>{return get<Function>(FuncChain.prototype,'_snakeCase').call(this,...arguments)}
split(separator: RegExp | string,limit?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_split').call(this,...arguments)}
startsWith(searchStr: string,position?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_startsWith').call(this,...arguments)}
substring(indexStart?: number,indexEnd?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_substring').call(this,...arguments)}
test(pattern: RegExp | string,flags?: string):FuncChain<any>{return get<Function>(FuncChain.prototype,'_test').call(this,...arguments)}
toFixed(scale?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_toFixed').call(this,...arguments)}
toString():FuncChain<any>{return get<Function>(FuncChain.prototype,'_toString').call(this,...arguments)}
trim():FuncChain<any>{return get<Function>(FuncChain.prototype,'_trim').call(this,...arguments)}
trimEnd():FuncChain<any>{return get<Function>(FuncChain.prototype,'_trimEnd').call(this,...arguments)}
trimStart():FuncChain<any>{return get<Function>(FuncChain.prototype,'_trimStart').call(this,...arguments)}
truncate(len: number,options?: {
    omission?: '...';
    separator?: string | RegExp;
}):FuncChain<any>{return get<Function>(FuncChain.prototype,'_truncate').call(this,...arguments)}
upperCase():FuncChain<any>{return get<Function>(FuncChain.prototype,'_upperCase').call(this,...arguments)}
upperFirst():FuncChain<any>{return get<Function>(FuncChain.prototype,'_upperFirst').call(this,...arguments)}
arrayToTree(idKey: string = 'id',pidKey?: string,options: {
    rootParentValue?: any;
    attrMap?: Record<string, any>;
    childrenKey?: string;
    sortKey?: string;
} = {}):FuncChain<any>{return get<Function>(FuncChain.prototype,'_arrayToTree').call(this,...arguments)}
closest<T = Record<UnknownMapKey, any>>(predicate: (node: Record<UnknownMapKey, any>, times: number, cancel: () => void) => boolean,parentKey: string):FuncChain<any>{return get<Function>(FuncChain.prototype,'_closest').call(this,...arguments)}
filterTree(predicate: (node: Record<UnknownMapKey, any>, parentNode: Record<UnknownMapKey, any>, chain: Record<UnknownMapKey, any>[], level: number) => boolean | NonFuncItee,options?: {
    childrenKey?: string;
}):FuncChain<any>{return get<Function>(FuncChain.prototype,'_filterTree').call(this,...arguments)}
findTreeNode(predicate: (node: Record<UnknownMapKey, any>, parentNode: Record<UnknownMapKey, any>, chain: Record<UnknownMapKey, any>[], level: number, index: number) => boolean | NonFuncItee,options?: {
    childrenKey?: string;
}):FuncChain<any>{return get<Function>(FuncChain.prototype,'_findTreeNode').call(this,...arguments)}
findTreeNodes(predicate: (node: Record<UnknownMapKey, any>, parentNode: Record<UnknownMapKey, any>, chain: Record<UnknownMapKey, any>[], level: number, index: number) => boolean | NonFuncItee,options?: {
    childrenKey?: string;
}):FuncChain<any>{return get<Function>(FuncChain.prototype,'_findTreeNodes').call(this,...arguments)}
alphaId():FuncChain<any>{return get<Function>(FuncChain.prototype,'_alphaId').call(this,...arguments)}
defaultTo<T,V>(defaultValue: V):FuncChain<any>{return get<Function>(FuncChain.prototype,'_defaultTo').call(this,...arguments)}
matcher<T extends Object>():FuncChain<any>{return get<Function>(FuncChain.prototype,'_matcher').call(this,...arguments)}
noConflict():FuncChain<any>{return get<Function>(FuncChain.prototype,'_noConflict').call(this,...arguments)}
snowflakeId(epoch?: number):FuncChain<any>{return get<Function>(FuncChain.prototype,'_snowflakeId').call(this,...arguments)}
times(iteratee: (n: number) => any):FuncChain<any>{return get<Function>(FuncChain.prototype,'_times').call(this,...arguments)}
toPath():FuncChain<any>{return get<Function>(FuncChain.prototype,'_toPath').call(this,...arguments)}
uniqueId():FuncChain<any>{return get<Function>(FuncChain.prototype,'_uniqueId').call(this,...arguments)}
uuid():FuncChain<any>{return get<Function>(FuncChain.prototype,'_uuid').call(this,...arguments)}
}//#cfx

/**
 * 用于定义FuncChain对象并构造函数链
 * 注意，该类仅用于内部构造函数链
 */
export class FuncChain<T> extends ChainFx{
  /**
   * @internal 
   */
  private _wrappedValue: T
  /**
   * @internal 
   */
  private _chain: { fn: Function; params: [] }[]

  /**
   * @internal 
   */
  constructor(v: T) {
    super()
    this._wrappedValue = v
    this._chain = []
  }

  /**
   * 惰性计算。执行函数链并返回计算结果
   * @example
   * //2-4
   * console.log(_([1,2,3,4]).map(v=>v+1).filter(v=>v%2===0).take(2).join('-').value())
   * //[1,2,2,1]
   * console.log(_(["{a:1,b:2}","{a:2,b:1}"]).map((v) => _.fval(v)).map(v=>[v.a,v.b]).join().value())
   * //[1,2,3,4]
   * console.log(_([1,2,3,4]).value())
   *
   * @returns 执行函数链返回的值
   */
  value() {
    let comprehension = isArrayLike(this._wrappedValue)
      ? createComprehension()
      : null
    const maxChainIndex = this._chain.length - 1
    return this._chain.reduce((acc, v, i) => {
      const params = [acc, ...v.params]
      if (comprehension) {
        let rs
        const sig = buildComprehension(comprehension, v.fn, v.params)
        if (sig > 0 || (!sig && maxChainIndex === i)) {
          rs = execComprehension(comprehension, acc)
          if (comprehension.tap) {
            ;(comprehension.tap as Function)(rs)
          }
          comprehension = null
        }
        if (sig > 1) {
          comprehension = createComprehension(v.fn, v.params)
        }
        if (rs) {
          return sig !== 1 ? rs : v.fn(...[rs, ...v.params])
        }
        return acc
      }
      if (CAN_COMPREHENSIONS.includes(v.fn.name)) {
        comprehension = createComprehension()
        return v.fn(...[acc, ...v.params])
      }
      return v.fn(...params)
    }, this._wrappedValue)
  }
}

const CAN_COMPREHENSIONS = [split.name, toArray.name, range.name]

function createComprehension(fn?: Function, params?: []) {
  const comprehension = {
    forEachRight: false,
    goalSettings: [],
    range: [],
    reverse: false,
    count: undefined,
    tap: undefined,
    returnEl: false,
  }
  if (fn && params) {
    buildComprehension(comprehension, fn, params)
  }
  return comprehension
}

function buildComprehension(
  comprehension: Record<string, any>,
  fn: Function,
  params: any[]
) {
  const fnName = fn.name
  switch (fnName) {
    case map.name:
    case filter.name:
      if (size(comprehension.range) > 0 || isDefined(comprehension.count))
        return 2
      let fn = params[0]
      if (!isFunction(fn)) {
        fn = iteratee(params[0])
      }
      comprehension.goalSettings.push({ type: fnName, fn: fn })
      break
    case reverse.name:
      if (size(comprehension.range) < 1) {
        comprehension.forEachRight = !comprehension.forEachRight
      } else {
        comprehension.reverse = !comprehension.reverse
      }
      break
    case slice.name:
      if (size(comprehension.range) > 0) return 2
      comprehension.range[0] = params[0]
      comprehension.range[1] = params[1]
      break
    case tail.name:
      if (size(comprehension.range) > 0) return 2
      comprehension.range[0] = 1
      comprehension.range[1] = params[1]
      break
    case take.name:
      if (isUndefined(comprehension.count) || params[0] < comprehension.count) {
        comprehension.count = params[0]
      }
      break
    case first.name:
    case head.name:
      if (isUndefined(comprehension.count) || 1 < comprehension.count) {
        comprehension.count = 1
        comprehension.returnEl = true
      }
      break
    case last.name:
      comprehension.count = 1
      comprehension.returnEl = true
      comprehension.forEachRight = true
      break
    case tap.name:
      comprehension.tap = params[0]
      break
    default:
      return 1
  }
  return 0
}

function execComprehension(
  comprehension: Record<string, any>,
  collection: any
) {
  const targets: any[] = []
  let targetIndex = 0
  if (!comprehension.count && comprehension.range.length > 0) {
    comprehension.count = comprehension.range[1] - comprehension.range[0]
  }
  const isReverse = comprehension.reverse
  const count = comprehension.count
  const gs = comprehension.goalSettings
  const gsLen = gs.length
  const range = comprehension.range
  const hasRange = range.length > 0
  const forEach = comprehension.forEachRight ? eachRight : each
  forEach(collection, (v, k) => {
    let t = v
    // before save target
    for (let i = 0; i < gsLen; i++) {
      const setting = gs[i]
      if (setting.type === map.name) {
        t = setting.fn(t, k)
      } else if (setting.type === filter.name) {
        if (!setting.fn(t, k)) {
          return
        }
      }
    } // for end

    if (hasRange && targetIndex++ < range[0]) return
    if (hasRange && targetIndex > range[1]) return false
    if (targets.length === count) return false

    if (isReverse) {
      targets.unshift(t)
    } else {
      targets.push(t)
    }
  })
  if (targets.length === 1 && comprehension.returnEl) {
    return targets[0]
  }
  return targets
}


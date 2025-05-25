import sortedIndexBy from '../array/sortedIndexBy'
import each from '../collection/each'
import sortBy from '../collection/sortBy'
import isArray from '../is/isArray'
import isObject from '../is/isObject'
import get from '../object/get'
import type { UnknownMapKey } from '../types'

/**
 * 使用高性能算法，将array结构数据变为tree结构数据。*注意，会修改原始数据*
 * @example
 * //生成测试数据
 * function addChildren(count,parent){
 *  const data = [];
 *  const pid = parent?parent.id:null;
 *  const parentName = parent?parent.name+'-':'';
 *  _.each(_.range(0,count),i=>{
 *    const sortNo = _.randi(0,count);
 *    data.push({id:_.alphaId(),pid,name:parentName+i,sortNo})
 *  });
 *  return data;
 * }
 *
 * function genTree(depth,parents,data){
 *  _.each(parents,r=>{
 *    const children = addChildren(_.randi(1,4),r);
 *    if(depth-1>0){
 *      genTree(depth-1,children,data);
 *    }
 *    _.append(data,...children);
 *  });
 * }
 *
 * const roots = addChildren(2);
 * const data = [];
 * genTree(2,roots,data);
 * _.insert(data,0,...roots);
 *
 * const tree = _.arrayToTree(data,'id','pid',{attrMap:{text:'name'}});
 * _.walkTree(tree,(parentNode,node,chain)=>console.log('node',node.text,'sortNo',node.sortNo,'chain',_.map(chain,n=>n.name)));
 *
 *
 * @param array 原始数据集。如果非Array类型，返回空数组
 * @param idKey id标识
 * @param pidKey='pid' 父id标识
 * @param {object} options 自定义选项
 * @param options.rootParentValue 根节点的parentValue，用于识别根节点。默认null
 * @param options.childrenKey 包含子节点容器的key。默认'children'
 * @param options.attrMap 转换tree节点时的属性映射，如\{text:'name'\}表示把array中一条记录的name属性映射为tree节点的text属性
 * @param options.sortKey 如果指定排序字段，则会在转换tree时自动排序。字段值可以是数字或字符等可直接进行比较的类型。性能高于转换后再排序
 * @returns 返回转换好的顶级节点数组或空数组
 * @since 1.0.0
 */
function arrayToTree(
  array: Record<UnknownMapKey, any>[],
  idKey: string = 'id',
  pidKey?: string,
  options: {
    rootParentValue?: any
    attrMap?: Record<string, any>
    childrenKey?: string
    sortKey?: string
  } = { childrenKey: 'children', rootParentValue: null, attrMap: undefined, sortKey: '' }
): Record<UnknownMapKey, any>[] {
  if (!isArray(array)) return []

  const pk = pidKey || 'pid'
  const attrMap = options.attrMap
  const hasAttrMap = !!attrMap && isObject(attrMap)
  const rootParentValue = get(options, 'rootParentValue', null)
  const childrenKey = options.childrenKey || 'children'
  const sortKey = options.sortKey
  const hasSortKey = !!sortKey
  const roots: Record<any, any>[] = []
  const nodeMap: { [key: string | number]: any } = {}
  const sortMap: { [key: string | number]: any } = {}
  const initParentMap: { [key: string | number]: boolean } = {}

  array.forEach((record) => {
    const nodeId = record[idKey || 'id']
    nodeMap[nodeId] = record
    if (hasSortKey) {
      const sortNo = record[sortKey]
      sortMap[nodeId] = [sortNo, sortNo] // min,max
    }

    if (record[pk] === rootParentValue) {
      if (hasAttrMap) {
        each<any, string>(attrMap, (v, k) => (record[k] = record[v]))
      }
      roots.push(record)
    }
  })

  array.forEach((record) => {
    const parentId = record[pk]
    const parentNode = nodeMap[parentId]
    if (parentNode) {
      let children = parentNode[childrenKey]
      if (!initParentMap[parentId]) {
        children = parentNode[childrenKey] = []
        initParentMap[parentId] = true
      }
      if (hasAttrMap) {
        each<any, string>(attrMap, (v, k) => (record[k] = record[v]))
      }
      if (hasSortKey) {
        const [min, max] = sortMap[parentId]

        const sortNo = record[sortKey]
        if (sortNo <= min) {
          children.unshift(record)
          sortMap[parentId][0] = sortNo
        } else if (sortNo >= max) {
          children.push(record)
          sortMap[parentId][1] = sortNo
        } else {
          const i = sortedIndexBy(children, { [sortKey]: sortNo }, sortKey)
          children.splice(i, 0, record)
        }
      } else {
        children.push(record)
      }
    }
  })

  return hasSortKey ? sortBy(roots, sortKey) : roots
}

export default arrayToTree
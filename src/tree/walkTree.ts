import {UnknownMapKey} from '../types'
import isArray from '../is/isArray'
import isEmpty from '../is/isEmpty'
import isArrayLike from '../is/isArrayLike'

/**
 * 以给定节点为根遍历所有子孙节点。深度优先
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
 * const tree = _.arrayToTree(data,'id','pid',{sortKey:'sortNo'});
 *
 * _.walkTree(tree,(node,parentNode,chain)=>console.log('node',node.name,'sortNo',node.sortNo,'chain',_.map(chain,n=>n.name)))
 *
 * @param treeNodes 一组节点或一个节点
 * @param callback (node,parentNode,chain,level)回调函数，如果返回false则中断遍历，如果返回-1则停止分支遍历
 * @param options 自定义选项
 * @param options.childrenKey 包含子节点容器的key。默认'children'
 * @since 1.0.0
 */
function walkTree(
  treeNodes: Record<UnknownMapKey, any> | Record<UnknownMapKey, any>[],
  callback: (
    node: Record<UnknownMapKey, any>,
    parentNode: Record<UnknownMapKey, any>,
    chain: Record<UnknownMapKey, any>[],
    level:number
  ) => boolean | number | void,
  options?: Record<UnknownMapKey, any>
): void {
  _walkTree(treeNodes, callback, options)
}
function _walkTree(
  treeNodes: Record<UnknownMapKey, any> | Record<UnknownMapKey, any>[],
  callback: (
    node: Record<UnknownMapKey, any>,
    parentNode: Record<UnknownMapKey, any>,
    chain: Record<UnknownMapKey, any>[],
    level:number
  ) => boolean | number | void,
  options?: Record<UnknownMapKey, any>,
  ...rest: any[]
): boolean | void {
  options = options || {}
  const parentNode = rest[0]
  const chain = rest[1] || []
  const childrenKey = options.childrenKey || 'children'
  const data = isArrayLike(treeNodes) ? treeNodes : [treeNodes]
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const rs = callback(node,parentNode, chain,chain.length)
    if (rs === false) return
    if (rs === -1) continue

    if (!isEmpty(node[childrenKey])) {
      let nextChain = [node]
      if (parentNode) {
        nextChain = chain.concat(nextChain)
      }
      const rs = _walkTree(
        node[childrenKey],
        callback,
        options,
        node,
        nextChain
      )
      if (rs === false) return
    }
  }
}

export default walkTree
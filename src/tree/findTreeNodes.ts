import {NonFuncItee, UnknownMapKey} from '../types'
import _iteratee from '../_iteratee'
import walkTree from './walkTree'

/**
 * 查找给定节点及所有子孙节点中符合断言的所有节点并返回
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
 *    const children = addChildren(_.randi(2,5),r);
 *    if(depth-1>0){
 *      genTree(depth-1,children,data);
 *    }
 *    _.append(data,...children);
 *  });
 * }
 *
 * const roots = addChildren(2);
 * const data = [];
 * genTree(3,roots,data);
 * _.insert(data,0,...roots);
 * const tree = _.arrayToTree(data,'id','pid',{sortKey:'sortNo'});
 *
 * _.each(_.findTreeNodes(tree,node=>node.sortNo>2),node=>console.log(_.omit(node,'children','id','pid')))
 *
 *
 * @param treeNodes 一组节点或一个节点
 * @param predicate (node,parentNode,chain,level) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @param options 自定义选项
 * @param options.childrenKey 包含子节点容器的key。默认'children'
 * @returns 找到的符合条件的所有节点或空数组
 * @since 1.0.0
 */
function findTreeNodes(
  treeNodes: Record<UnknownMapKey, any> | Record<UnknownMapKey, any>[],
  predicate: (node: Record<UnknownMapKey, any>,
    parentNode: Record<UnknownMapKey, any>,
    chain: Record<UnknownMapKey, any>[],
    level:number) => boolean | NonFuncItee,
  options?: { childrenKey?: string }
): Record<UnknownMapKey, any>[] {
  const callback = _iteratee(predicate)
  const nodes: Record<UnknownMapKey, any>[] = []
  walkTree(
    treeNodes,
    (n,p, c,l) => {
      const rs = callback(n,p, c,l)
      if (rs) {
        nodes.push(n)
      }
    },
    options
  )
  return nodes
}

export default findTreeNodes
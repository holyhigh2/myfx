import {NonFuncItee, UnknownMapKey} from '../types'
import _iteratee from '../_iteratee'
import walkTree from './walkTree'
import includes from '../collection/includes'
import map from '../collection/map'
import cloneWith from '../object/cloneWith'

/**
 * 类似<code>findTreeNodes</code>，但会返回包含所有父节点的节点副本数组，已做去重处理。
 * 结果集可用于重新构建tree
 * @example
 * //生成测试数据
 * function addChildren(count,parent){
 *  const data = [];
 *  const pid = parent?parent.id:null;
 *  const parentName = parent?parent.name+'-':'';
 *  _.each(_.range(0,count),i=>{
 *    const sortNo = _.randi(1,4);
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
 * _.each(_.filterTree(tree,node=>node.sortNo>1),node=>console.log(_.omit(node,'children','id','pid')))
 *
 *
 * @param treeNodes 一组节点或一个节点
 * @param predicate (node) 断言
 * <br>当断言是函数时回调参数见定义
 * <br>其他类型请参考 {@link utils!iteratee}
 * @param options 自定义选项
 * @param options.childrenKey 包含子节点容器的key。默认'children'
 * @returns 找到的符合条件的所有节点副本或空数组
 * @since 1.5.0
 */
function filterTree(
  treeNodes: Record<UnknownMapKey, any> | Record<UnknownMapKey, any>[],
  predicate: (node: Record<UnknownMapKey, any>) => boolean | NonFuncItee,
  options?: { childrenKey?: string }
): Record<UnknownMapKey, any>[] {
  options = options || {}
  const callback = _iteratee(predicate)
  const childrenKey = options.childrenKey || 'children'
  let nodes: Record<UnknownMapKey, any>[] = []
  walkTree(
    treeNodes,
    (p, n, c) => {
      const rs = callback(n)
      if (rs) {
        c.forEach((node) => {
          if (!includes(nodes, node)) {
            nodes.push(node)
          }
        })
        nodes.push(n)
      }
    },
    options
  )

  nodes = map(nodes, (item) =>
    cloneWith(item, (v, k) => (k === childrenKey ? null : v))
  )

  return nodes
}

export default filterTree
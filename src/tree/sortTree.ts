import isArray from '../is/isArray'
import isEmpty from '../is/isEmpty'
import type { UnknownMapKey } from '../types'

/**
 * 对给定节点及所有子孙节点(同级)排序
 * @example
 * //生成测试数据
 * function addChildren(count,parent){
 *  const data = [];
 *  const pid = parent?parent.id:null;
 *  const parentName = parent?parent.name+'-':'';
 *  _.each(_.range(0,count),i=>{
 *    const sortNo = _.randi(0,9);
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
 * const roots = addChildren(1);
 * const data = [];
 * genTree(2,roots,data);
 * _.insert(data,0,...roots);
 * let tree = _.arrayToTree(data,'id','pid');
 *
 * console.log('Before sort---------------');
 * _.walkTree(_.cloneDeep(tree),(parentNode,node,chain)=>console.log('node',node.name,'sortNo',node.sortNo))
 * _.sortTree(tree,(a,b)=>a.sortNo - b.sortNo);
 * console.log('After sort---------------');
 * _.walkTree(tree,(parentNode,node,chain)=>console.log('node',node.name,'sortNo',node.sortNo))
 *
 * @param treeNodes 一组节点或一个节点
 * @param comparator (a,b) 排序函数
 * @param options 自定义选项
 * @param options.childrenKey 包含子节点容器的key。默认'children'
 *
 * @since 1.0.0
 */
function sortTree(
  treeNodes: Record<UnknownMapKey, any> | Record<UnknownMapKey, any>[],
  comparator: (
    a: Record<UnknownMapKey, any>,
    b: Record<UnknownMapKey, any>
  ) => number,
  options?: { childrenKey?: string }
): void {
  options = options || {}
  const childrenKey = options.childrenKey || 'children'
  const data: Record<UnknownMapKey, any>[] = isArray<any>(treeNodes)
    ? treeNodes
    : [treeNodes]
  data.sort((a, b) => comparator(a, b))

  data.forEach((node) => {
    if (!isEmpty(node[childrenKey])) {
      sortTree(node[childrenKey], comparator)
    }
  })
}

export default sortTree
import { split, compose, reduce, map, isEmpty } from 'ramda';

/*
* Node = {
*   id: Int,
*   parent: Node,
*   children: [Node],
* }
*/
const addNode = (id, nodes) => {
  return nodes.set(id, {
    id,
    parentId: '-1',
    childrenIds: [],
  });
}

const addRelation = (parentId, childId, nodes) => {
  const parentNode = nodes.get(parentId);
  const childNode = nodes.get(childId);
  const newParent = {
    ...parentNode,
    childrenIds: [childId, ...parentNode.childrenIds],
  }
  const newChild = {
    ...childNode,
    parentId,
  }
  nodes.set(childId, newChild);
  nodes.set(parentId, newParent);
  return nodes;
}

const countOrbitsOfNode = (node, nodes) => {
  if (node.parentId === '-1') return 0;
  return 1 + countOrbitsOfNode(nodes.get(node.parentId), nodes);
}

const countOrbits = tree => reduce((total, node) => total + countOrbitsOfNode(node, tree), 0, tree.values());

const createNodes = reduce((acc, [parentId, childId]) => {
  if (!acc.has(parentId)) { acc = addNode(parentId, acc); }
  if (!acc.has(childId)) { acc = addNode(childId, acc); }
  acc = addRelation(parentId, childId, acc);
  return acc;
}, new Map())

const entry1 = compose(
  countOrbits,
  createNodes,
  map(split(')'))
)

export { entry1 }

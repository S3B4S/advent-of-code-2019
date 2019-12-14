import { split, compose, reduce, map, isEmpty } from 'ramda';

/*
* Node = {
*   id: Int,
*   parent: Node,
*   children: [Node],
* }
*/
const addNode = (id, nodes) => {
  nodes.set(id, {
    id,
    parent: {},
    children: [],
  });
}

const addRelation = (parentId, childId, nodes) => {
  const parentNode = nodes.get(parentId);
  const childNode = nodes.get(childId);

  parentNode.children = [childNode, ...parentNode.children];
  childNode.parent = parentNode;
}

const countOrbitsOfNode = node => {
  if (isEmpty(node.parent)) return 0;
  return 1 + countOrbitsOfNode(node.parent);
}

const countOrbits = tree => reduce((total, node) => total + countOrbitsOfNode(node), 0, tree.values());

const createNodes = reduce((acc, [parentId, childId]) => {
  if (!acc.has(parentId)) { addNode(parentId, acc); }
  if (!acc.has(childId)) { addNode(childId, acc); }
  addRelation(parentId, childId, acc);
  return acc;
}, new Map())

const entry1 = compose(
  countOrbits,
  createNodes,
  map(split(')'))
)

export { entry1 }

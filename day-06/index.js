import { split, compose, reduce, map, isEmpty, tap } from 'ramda';

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

const addEdge = (parentId, childId, nodes) => {
  const parentNode = nodes.get(parentId);
  const childNode = nodes.get(childId);

  parentNode.children = [childNode, ...parentNode.children];
  childNode.parent = parentNode;
};

const createTree = reduce((tree, [parentId, childId]) => {
  if (!tree.has(parentId)) { addNode(parentId, tree); }
  if (!tree.has(childId)) { addNode(childId, tree); }
  addEdge(parentId, childId, tree);
  return tree;
}, new Map());

const countOrbitsOfNode = node => {
  if (isEmpty(node.parent)) return 0;
  return 1 + countOrbitsOfNode(node.parent);
};

const countOrbitsOfTree = tree => reduce((total, node) => total + countOrbitsOfNode(node), 0, tree.values());

const totalOrbits = compose(
  countOrbitsOfTree,
  createTree,
  map(split(')'))
);

export { totalOrbits }

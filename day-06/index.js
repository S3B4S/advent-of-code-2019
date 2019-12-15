import { split, compose, reduce, map, isEmpty, tap } from 'ramda';

/*
* Node = {
*   id: Int,
*   parent: Node,
*   children: [Node],
* }
*/
const addNode = (id, nodes) => {
  nodes[id] = {
    id,
    parent: {},
  };
}

const addEdge = (parentId, childId, nodes) => {
  const parentNode = nodes[parentId];
  const childNode = nodes[childId];

  childNode.parent = parentNode;
};

const createTree = reduce((tree, [parentId, childId]) => {
  if (!tree[parentId]) { addNode(parentId, tree); }
  if (!tree[childId]) { addNode(childId, tree); }
  addEdge(parentId, childId, tree);
  return tree;
}, {});

const countOrbitsOfNode = node => {
  if (isEmpty(node.parent)) return 0;
  return 1 + countOrbitsOfNode(node.parent);
};

const countOrbitsOfTree = tree => reduce((total, node) => total + countOrbitsOfNode(node), 0, Object.values(tree));

const totalOrbits = compose(
  countOrbitsOfTree,
  createTree,
  map(split(')'))
);

export { totalOrbits }

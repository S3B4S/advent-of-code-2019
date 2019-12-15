import R from 'ramda';
const { split, compose, reduce, map, isEmpty } = R;
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
  const childNode = nodes[childId];
  childNode.parent = nodes[parentId];
};

const createTree = list => reduce((tree, [parentId, childId]) => {
  if (!tree[parentId]) { addNode(parentId, tree); }
  if (!tree[childId]) { addNode(childId, tree); }
  addEdge(parentId, childId, tree);
  return tree;
}, {}, list);

const countOrbitsOfNode = (node, nodes) => {
  if (isEmpty(node.parent)) return 0;
  return 1 + countOrbitsOfNode(node.parent, nodes);
};

const countOrbitsOfTree = tree => reduce((total, node) => total + countOrbitsOfNode(node, tree), 0, Object.values(tree));

const totalOrbits = compose(
  countOrbitsOfTree,
  createTree,
  map(split(')'))
);

export { totalOrbits }

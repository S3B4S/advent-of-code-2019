import { split, compose, reduce, map, isEmpty, findIndex, equals, add, reduced, find } from 'ramda';
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

const createTreeFromTxt = compose(
  createTree,
  map(split(')')),
)

const totalOrbits = compose(
  countOrbitsOfTree,
  createTreeFromTxt,
);

const pathToRoot = (tree, node) => {
  if (isEmpty(node.parent)) return [];
  return [node.parent.id, ...pathToRoot(tree, node.parent)];
}

const findCommonElement = (list1, list2) => {
  return list1.filter(x => list2.includes(x))[0]
}

const pathsToYOUandSAN = tree => [
  pathToRoot(tree, tree['YOU']),
  pathToRoot(tree, tree['SAN'])
]

const findSharedPlanetAndZip = (paths) => {
  const [path1, path2] = paths;
  const sharedPlanet = findCommonElement(path1, path2);
  return map(path => [path, sharedPlanet], paths);
}

const amountPaths = ([path, planet]) => findIndex(equals(planet), path)

const stepsYOUtoSAN = compose(
  reduce(add, 0),
  map(amountPaths),
  findSharedPlanetAndZip,
  pathsToYOUandSAN,
  createTreeFromTxt
)

export { totalOrbits, pathToRoot, createTree, findCommonElement, stepsYOUtoSAN }

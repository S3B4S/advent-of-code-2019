import { map, isEmpty, filter, not, compose } from 'ramda';
import { run } from './intcode';

const isNotEmpty = compose(not, isEmpty);

const createNode = value => ({
  value: value,
  children: [],
})

const combinationsOfSequence = sequence => {
  const root = {
    value: [],
    children: [],
  }
  generateChildren(root, sequence);
  return root;
}

const generateChildren = (root, sequence) => {
  const remainingChars = sequence.filter(x => !root.value.includes(x));
  if (remainingChars.length === 0) return;

  for (const remainingChar of remainingChars) {
    root.children.push(createNode([...root.value, remainingChar]));
  }

  for (const child of root.children) {
    generateChildren(child, sequence);
  }
}

// Traverse the tree and map each node with given function
// mapTree :: (Node -> a) -> Tree -> [a]
const mapTree = (fn, root) => {
  const stack = [root];
  let currentNode = root;
  const results = [];

  while (stack.length !== 0) {
    currentNode = stack.pop();
    for (const child of currentNode.children) {
      stack.push(child);
    }
    results.push(fn(currentNode));
  }

  return results
}

const main = () => {
  const tree = combinationsOfSequence(['1', '2', '3', '4', '5']);
  const res = mapTree(x => x.children.length === 0 ? x.value : [], tree);
}

export { isNotEmpty, combinationsOfSequence, mapTree, main }

import { map, filter, reduce, max, compose, curry } from 'ramda';
import { run } from './intcode';
import { isNotEmpty } from '../utils';

const createNode = value => ({
  value: value,
  children: [],
})

export const combinationsOfSequence = sequence => {
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
export const mapTree = curry((fn, root) => {
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
})

const runAmplifiers = memory => phaseSettings => {
  const outputAmplifierE = reduce((inputSignal, phaseSetting) => {
    return run(memory, [inputSignal, phaseSetting])
  }, 0, phaseSettings);
  return outputAmplifierE;
}

export const findMaxThrusterSignal = memory => compose(
  reduce(max, 0),
  map(runAmplifiers(memory)),
  map(map(parseInt)),
  filter(isNotEmpty),
  mapTree(x => x.children.length === 0 ? x.value : []),
  combinationsOfSequence,
)

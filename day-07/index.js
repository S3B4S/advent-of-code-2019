import { map, filter, reduce, max, compose, curry } from 'ramda';
import program from './intcode';
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

const runAmplifiers = memory => reduce((inputSignal, phaseSetting) => program.run(memory, [inputSignal, phaseSetting]), 0);

export const findMaxThrusterSignal = memory => compose(
  reduce(max, 0),
  map(runAmplifiers(memory)), // For eah sequence, run the phase program and collect outputs of amplifier E
  map(map(parseInt)), // Turn all chars to ints to supply to the program
  filter(isNotEmpty), // Non-leaves return empty arrays, filter those out
  mapTree(x => x.children.length === 0 ? x.value : []), // Collect values of leaves
  combinationsOfSequence,
)

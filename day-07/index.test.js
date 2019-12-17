import fs from 'fs';
import { filter } from 'ramda';
import { isNotEmpty, combinationsOfSequence, mapTree, main } from './index';

// Read in data and clean it
// const txt = fs.readFileSync('./day-07/input.txt', 'utf8');
// const inputData; // Create input data as appropriate

test('Amount of unique combinations is 120 for 5 characters', () => {
  // First place has five options, when one has been picked, the second place only has four options,
  // this results in the amount of combinations being 5 * 4 * 3 * 2 * 1 = 120
  const tree = combinationsOfSequence(['1', '2', '3', '4', '5']);
  const res = mapTree(x => x.children.length === 0 ? x.value : [], tree);
  const amountCombinations = filter(isNotEmpty, res).length
  expect(amountCombinations).toEqual(120);
})

test('Pass the examples for part 1', () => {
  main();
});

test('Pass the puzzle input for part 1', () => {
});

test('Pass the examples for part 2', () => {
});

test('Pass the puzzle input for part 2', () => {
});

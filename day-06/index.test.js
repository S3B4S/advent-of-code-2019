import fs from 'fs';
import { split, isEmpty, filter, not, compose, map } from 'ramda';
import { totalOrbits, pathToRoot, createTree, findCommonElement } from './index';

// Read in data and clean it
const txt = fs.readFileSync('./day-06/input.txt', 'utf8');
const cleanData = compose(
  filter(compose(not, isEmpty)),
  split('\n'),
)
const inputData = cleanData(txt);

afterEach(() => {
  jest.clearAllMocks();
});

test('Pass the examples for part 1', () => {
  expect(totalOrbits(cleanData(
    'COM)B\n' +
    'B)C\n' +
    'C)D\n' +
    'D)E\n' +
    'E)F\n' +
    'B)G\n' +
    'G)H\n' +
    'D)I\n' +
    'E)J\n' +
    'J)K\n' +
    'K)L\n'))).toEqual(42);

  // Same data as above but in different order
  expect(totalOrbits(cleanData(
    'COM)B\n' +
    'D)E\n' +
    'B)C\n' +
    'C)D\n' +
    'E)F\n' +
    'E)J\n' +
    'G)H\n' +
    'J)K\n' +
    'B)G\n' +
    'D)I\n' +
    'K)L\n'))).toEqual(42);
});

test('Pass the puzzle input for part 1', () => {
  const tree = compose(
    createTree,
    map(split(')')),
    cleanData
  )(
    'COM)B\n' +
    'B)C\n' +
    'C)D\n' +
    'D)E\n' +
    'E)F\n' +
    'B)G\n' +
    'G)H\n' +
    'D)I\n' +
    'E)J\n' +
    'J)K\n' +
    'K)L\n' +
    'K)YOU\n' +
    'I)SAN\n'
  )
  expect(pathToRoot(tree, tree['YOU'])).toEqual(['K', 'J', 'E', 'D', 'C', 'B', 'COM']);
  expect(pathToRoot(tree, tree['COM'])).toEqual([]);
});

test('Find common element', () => {
  expect(findCommonElement([1, 2, 3], [3, 4, 5])).toEqual(3);
  expect(findCommonElement(['a', 'b', 'c'], ['g', 'b', 'd'])).toEqual('b');
});

test('Path to root constructed properly', () => {
  expect()
});

test('Pass the puzzle input for part 2', () => {
});

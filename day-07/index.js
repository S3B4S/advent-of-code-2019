import { map, isEmpty } from 'ramda';
import { run } from './intcode';

const SEQUENCE = ['1', '2', '3', '4', '5'];

const createNode = value => ({
  value: value,
  children: [],
})

const root = {
  value: [],
  children: [],
}

const generateChildren = node => {
  const remainingChars = SEQUENCE.filter(x => !node.value.includes(x));
  if (remainingChars.length === 0) return;

  for (const remainingChar of remainingChars) {
    node.children.push(createNode([...node.value, remainingChar]));
  }

  for (const child of node.children) {
    generateChildren(child);
  }
}

const collectLeaves = root => {
  if (isEmpty(root.children)) {
    return root.value
  }

  const a = [];
  for (const child of root.children) {
    a.push(collectLeaves(child));
  }
  console.log(a);
}

const main = () => {
  generateChildren(root);
  console.log(JSON.stringify(root, null, 2));
  collectLeaves(root);
}

export { main }

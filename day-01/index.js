// Inline destructing unfortunately didn't work for Node 13.3
import R from 'ramda';
const { split, compose, not, map, filter, sum } = R;
import fs from 'fs';

/// Utils
const splitTxtFile = split('\r\n');
const isNotNaN = compose(not, isNaN);
const getFuel = mass => Math.floor(mass / 3) - 2

/// Program
// Read in data and clean it
const txt = fs.readFileSync('./input.txt', 'utf8');
const data = filter(isNotNaN, map(parseInt, splitTxtFile(txt)));
// Calculate result
const clean = map(getFuel, data);
const result = sum(clean);

console.log(result); // -> 3391707
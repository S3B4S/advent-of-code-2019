// Inline destructing unfortunately didn't work for Node 13.3
import R from 'ramda';
const { split, compose, not, map, filter, sum } = R;
import fs from 'fs';

// Read in data and clean it
const splitTxtFile = split('\r\n');
const isNotNaN = compose(not, isNaN);

const txt = fs.readFileSync('./day-01/input.txt', 'utf8');
const inputData = filter(isNotNaN, map(parseInt, splitTxtFile(txt)));

/// PART 01
const getFuel = mass => Math.floor(mass / 3) - 2;

const amountsFuel = map(getFuel, inputData);
const result01 = sum(amountsFuel);

console.log(result01); // -> 3391707

/// PART 02
const getFuelRec = mass => {
  const newMass = getFuel(mass);
  return newMass <= 0 ? 0 : newMass + getFuelRec(newMass);
}

const amountsFuelRec = map(getFuelRec, inputData);
const result02 = sum(amountsFuelRec);

console.log(result02); // -> 5084676

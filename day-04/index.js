import { map, compose, range, split, countBy, identity, toString, tap, reduceWhile, __ } from 'ramda';

/// Part 1
// is6digit :: String -> Bool
const is6digit = digits => digits.length === 6;

// containsDouble :: String -> Bool
const containsDouble = digits => {
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] === digits[i + 1]) {
      return true;
    }
  }
  return false;
}

const isIncreasing = digits => compose(
  reduceWhile((acc, _) => acc.increasing, (acc, curr) => ({
    lastEl: curr,
    increasing: acc.lastEl <= curr
  }), { lastEl: -1, increasing: true }),
  map(parseInt),
  split('')
)(digits).increasing

// meetsCriteria :: String -> Bool
const meetsCriteria1 = digits => is6digit(digits) && containsDouble(digits) && isIncreasing(digits);

// countPasswordsValidity :: String -> Obj
const countPasswordsValidity = compose(
  countBy(identity),
  map(compose(meetsCriteria1, toString)),
  ([low, high]) => range(low, high),
  map(parseInt),
  split('-')
);

const amountPasswordsValid = inputRange => countPasswordsValidity(inputRange).true;

/// Part 2
const accumulateChars = digits => {
}

// meetsCriteria :: String -> Bool
const meetsCriteria2 = digits => is6digit(digits) && containsExactDouble(digits) && isIncreasing(digits);

export { meetsCriteria1, meetsCriteria2, amountPasswordsValid }

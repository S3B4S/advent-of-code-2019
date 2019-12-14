import { map, compose, range, split, countBy, identity, toString } from 'ramda';

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

// isIncreasing :: String -> Bool
const isIncreasing = digits => {
  const ints = compose(
    map(parseInt),
    split(''),
  )(digits);
  for (let i = 1; i < ints.length; i++) {
    if (ints[i] < ints[i - 1]) return false;
  }
  return true;
}

// meetsCriteria :: String -> Bool
const meetsCriteria = digits => is6digit(digits) && containsDouble(digits) && isIncreasing(digits);

// countPasswordsValidity :: String -> Obj
const countPasswordsValidity = compose(
  countBy(identity),
  map(compose(meetsCriteria, toString)),
  ([low, high]) => range(low, high),
  map(parseInt),
  split('-')
);

const amountPasswordsValid = inputRange => countPasswordsValidity(inputRange).true;

/// Part 2

export { meetsCriteria, amountPasswordsValid }

import { map, compose, range, split, countBy, identity, toString, reduceWhile } from 'ramda';

// every :: ((a, Int, [a]) -> Bool) -> [a] -> Bool
const every = fn => list => list.every(fn);

/// Part 1
// is6digit :: String -> Bool
const is6digit = digits => digits.length === 6;

// isIncreasing :: String -> Bool
const isIncreasing = compose(
  every((number, index, list) => index === 0 || number >= list[index - 1]),
  map(parseInt),
  split('')
)

// countCriteriaForRange :: (String -> Bool) -> String -> Obj
const countCriteriaForRange = criteria => compose(
  countBy(identity),
  map(compose(criteria, toString)),
  ([low, high]) => range(low, high),
  map(parseInt),
  split('-')
)

// containsDouble :: String -> Bool
const containsDouble = digits => {
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] === digits[i + 1]) {
      return true;
    }
  }
  return false;
}

// meetsCriteria :: String -> Bool
const meetsCriteria1 = digits => is6digit(digits) && containsDouble(digits) && isIncreasing(digits);

// amountPasswordsValid1 :: String -> Int
const amountPasswordsValid1 = inputRange => countCriteriaForRange(meetsCriteria1)(inputRange).true;

/// Part 2
// containsExactDouble :: String -> Bool
const containsExactDouble = digits => {
  const result = reduceWhile(
    // If the last char amounted 2 and a different char is found we've found our exact double
    (acc, curr) => !(acc.element !== curr && acc.amount === 2),
    // Increment last element if it's duplicated, otherwise reset to current element + amount
    (acc, curr) => ({
      element: curr,
      amount: curr === acc.element ? acc.amount + 1 : 1
    }),
    { element: -1, amount: 1 })(digits)
  return result.amount === 2
}

// meetsCriteria :: String -> Bool
const meetsCriteria2 = digits => is6digit(digits) && containsExactDouble(digits) && isIncreasing(digits);

// amountPasswordsValid2 :: String -> Int
const amountPasswordsValid2 = inputRange => countCriteriaForRange(meetsCriteria2)(inputRange).true;

export { meetsCriteria1, meetsCriteria2, amountPasswordsValid1, amountPasswordsValid2 }

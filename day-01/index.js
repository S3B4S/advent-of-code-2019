import { compose, map, sum } from 'ramda';

/// PART 1
const getFuel = mass => Math.floor(mass / 3) - 2;
const totalFuel = compose(sum, map(getFuel));

/// PART 2
const getFuelRec = mass => {
  const newMass = getFuel(mass);
  return newMass <= 0 ? 0 : newMass + getFuelRec(newMass);
}
const totalFuelRec = compose(sum, map(getFuelRec));

export { totalFuel, totalFuelRec }
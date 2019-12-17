import { compose, not, isEmpty } from 'ramda';

export const isNotNaN = compose(not, isNaN);

export const isNotEmpty = compose(not, isEmpty);
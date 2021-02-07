import { curry, reduce, merge } from 'ramda'

/**
 * e.g. projectArrToObject('name', 'age', { name: 'Ted', age: 30 })
 * => {Ted: 30}
 */
export const projectArrToObject = curry((keyProp, valProp, target) =>
  reduce((acc, obj) => merge({ [obj[keyProp]]: obj[valProp] }, acc), {}, target)
)

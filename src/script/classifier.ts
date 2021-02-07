import { length, pipe, map, prop, uniq, curry, reject, equals, add, reduce, multiply, partial } from 'ramda'
import { TrainingRecord, Attr, Category } from '../types/record'
import { recordsOf } from './records-of'

const classify: Classify = (records, attrs): any => {
  const smooth = 1.01
  const categories = pipe(map(prop('category')), uniq)(records)
  const recordOf = recordsOf(records)

  const categoryProbability = (category: Category): number => length(recordOf(category)) / length(records) + smooth
  const attrProbability = (category: Category, attr: Attr): number => length(recordOf(category, attr)) / length(records)
  const transform = (category: Category, probability: number): Result => ({ category, probability })

  return pipe(
    map((category: Category) => {
      return pipe(
        map(partial(attrProbability, [category])),
        reject(equals(0)),
        map(add(smooth)),
        reduce(multiply, categoryProbability(category)),
        partial(transform, [category])
      )(attrs)
    })
  )(categories)
}

export const classifier: Classifier = (records) => curry(classify)(records)

type Classify = (
  records: TrainingRecord[],
  attrs: Attr[]
) => Record<Category, number>
type Classify1 = (attrs: Attr[]) => Record<Category, number>
type Classifier = (records: TrainingRecord[]) => Classify1

interface Result {
  category: Category
  probability: number
}

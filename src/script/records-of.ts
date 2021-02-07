import { filter, both, ifElse, always, pipe, prop, equals, find } from 'ramda'
import { TrainingRecord, Category, Attr } from '../types/record'

const matchCategory = (category) => pipe(prop('category'), equals(category))
const matchAttr = (attr) => pipe(prop('attrs'), find(equals(attr)))

export const recordsOf: RecordOf = (records) => (category, attr) =>
  filter(
    both(
      matchCategory(category),
      ifElse(always(!!attr), matchAttr(attr), always(true))
    ),
    records
  )

type RecordOf = (
  records: TrainingRecord[]
) => (category: Category, attr?: Attr) => TrainingRecord[]

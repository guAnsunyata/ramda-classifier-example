# Ramda Classifier
Introduce Ramda a practical functional library for JavaScript/TypeScript by Naive Bayes classifier script.

It's code after refactoring from refactoring tutorial from a book [Refactoring JavaScript: Turning Bad Code Into Good Code](https://www.amazon.com/Refactoring-JavaScript-Turning-Code-Into-ebook/dp/B06XK1V629)

This repo refactor the original code into a functional programming style version by adopting Ramda.

## Read the Source Code

Naive Bayes classifier

see [classifier](https://github.com/guAnsunyata/ramda-classifier-example/blob/main/src/script/classifier.ts)

Query records in specific parameters for calculating classifier probability

see [record-of](https://github.com/guAnsunyata/ramda-classifier-example/blob/main/src/script/records-of.ts)
see [test case of record-of](https://github.com/guAnsunyata/ramda-classifier-example/blob/main/test/%20records-of.test.ts)

Test final result for refactoring code from the book

see [test final result](https://github.com/guAnsunyata/ramda-classifier-example/blob/main/test/classifier.test.ts)

## Introduce readibility

Make formula of Naive Bayes classifier more clear.
Use query function in a declarative way to indicate the probability concepts. Rather than generating snapshot maps imperatively.

```ts
const categoryProbability = (category) =>
  length(recordOf(category)) / length(records) + smooth

const attrProbability = (category, attr) =>
  length(recordOf(category, attr)) / length(records)
```

Implementation of query function 
```ts
export const recordsOf: RecordOf = (records) => (category, attr) =>
  filter(
    both(
      matchCategory(category),
      ifElse(always(!!attr), matchAttr(attr), always(true))
    ),
    records
  )

const matchCategory = (category) => pipe(prop('category'), equals(category))
const matchAttr = (attr) => pipe(prop('attrs'), find(equals(attr)))
```

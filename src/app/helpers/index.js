const compose =
  (...functions) =>
  input =>
    functions.reduceRight((chain, func) => chain.then(func), Promise.resolve(input))

const pipe =
  (...functions) =>
  input =>
    functions.reduce((chain, func) => chain.then(func), Promise.resolve(input))

const sleep = seconds => new Promise(r => setTimeout(r, seconds * 1000))    

const slugify = (str = '', separator = '-') => {
  return str
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, separator)
    .replace(/[^\w-]+/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/--+/g, separator)
}

module.exports = {compose, pipe, sleep, slugify}
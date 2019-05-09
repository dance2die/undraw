import normalize from './normalize'
import filterUniqueNames from './filterUniqueNames'

// // https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
// function debounce(fn, ms, leading = true) {
//   let timeout

//   return function run() {
//     const now = leading && !timeout
//     clearTimeout(timeout)

//     const execute = () => fn.apply(this, arguments)

//     timeout = setTimeout(() => {
//       timeout = null
//       !leading && execute()
//     }, ms)

//     now && execute()
//   }
// }

const imageWidth = 375
const imageHeight = 280
const getColumnCount = width => ~~(width / imageWidth)
const getWidth = width =>
  Math.max(imageWidth, ~~(width / getColumnCount(width, 0))) - 10
const getHeight = width => imageHeight

export { normalize, getColumnCount, getWidth, getHeight, filterUniqueNames }

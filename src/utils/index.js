import normalize from './normalize'
import filterUniqueNames from './filterUniqueNames'
import ExternalLink from './ExternalLink'

// https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
// function debounce(fn, ms, leading = true) {
//   // console.log(`debouncing ms=${ms}`, fn)
//   let timeout = null

//   return function run() {
//     const now = leading && !timeout
//     console.log(
//       `!!! clearing timeout=${timeout} now=${now}, leading=${leading}`
//     )
//     clearTimeout(timeout)

//     const execute = () => fn.apply(this, arguments)

//     timeout = setTimeout(() => {
//       timeout = null
//       !leading && execute()
//       console.log(`executing within run...`)
//     }, ms)

//     console.log(`timeout=${timeout}, now=${now}, leading=${leading}`)
//     now && execute()
//   }
// }

function debounce(func, wait, immediate) {
  var timeout

  // This is the function that is actually executed when
  // the DOM event is triggered.
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    var context = this
    var args = arguments

    // The function to be called after
    // the debounce time has elapsed
    var later = function() {
      // null timeout to indicate the debounce ended
      timeout = null

      // Call function now if you did not on the leading end
      if (!immediate) func.apply(context, args)
    }

    // Determine if you should call the function
    // on the leading or trail end
    var callNow = immediate && !timeout

    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    clearTimeout(timeout)

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs node)
    timeout = setTimeout(later, wait)

    // Call immediately if you're dong a leading
    // end execution
    if (callNow) func.apply(context, args)
  }
}

const imageWidth = 375
const imageHeight = 280
const getColumnCount = width => ~~(width / imageWidth)
const getWidth = width =>
  Math.max(imageWidth, ~~(width / getColumnCount(width, 0))) - 10
const getHeight = width => imageHeight

export {
  normalize,
  getColumnCount,
  getWidth,
  getHeight,
  filterUniqueNames,
  debounce,
  ExternalLink,
}

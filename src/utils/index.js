// https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
function debounce(fn, ms, leading = true) {
  let timeout

  return function run() {
    const now = leading && !timeout
    clearTimeout(timeout)

    const execute = () => fn.apply(this, arguments)

    timeout = setTimeout(() => {
      timeout = null
      !leading && execute()
    }, ms)

    now && execute()
  }
}

const imageWidth = 375
const imageHeight = 280
const getColumnCount = width => ~~(width / imageWidth)
const getWidth = width =>
  Math.max(imageWidth, ~~(width / getColumnCount(width, 0))) - 10
const getHeight = width => imageHeight

// Normalize undraw JSON files
// Demo: https://repl.it/@dance2die/Normalizr-for-undraw-data
function normalize(localNames) {
  const tags = [
    ...new Set(
      localNames.reduce((acc, name) => acc.concat(name.tags.split(', ')), [])
    ),
  ]
  return tags.map(tag => {
    return {
      type: tag,
      payload: [
        ...localNames
          .filter(o => o.tags.includes(tag))
          .map(o => ({
            image: o.image,
            title: o.title,
          })),
      ],
    }
  })
}

export { debounce, normalize, getColumnCount, getWidth, getHeight }

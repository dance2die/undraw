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

  const titles = [
    ...new Set(localNames.reduce((acc, name) => acc.concat(name.title), [])),
  ]

  const tagObjects = tags.map(tag => {
    return {
      type: tag.toLowerCase(),
      payload: [
        ...localNames
          .filter(o => o.tags.includes(tag))
          .map(o => ({
            image: o.image,
            title: o.title,
            tags: o.tags,
          })),
      ],
    }
  })

  const titleObjects = titles.map(title => {
    return {
      type: title.toLowerCase(),
      payload: [
        ...localNames
          .filter(o => o.title === title)
          .map(o => ({
            image: o.image,
            title: o.title,
            tags: o.tags,
          })),
      ],
    }
  })

  return [...tagObjects, ...titleObjects]
}

/**
 *
 * @param {Array} foundNames - an array of `{image: string, type: string, tags: string}`
 */
function filterUniqueNames(foundNames) {
  return Object.values(
    foundNames.reduce((acc, o) => {
      if (!acc[o.title]) acc[o.title] = o
      return acc
    }, new Map())
  )
}

export {
  debounce,
  normalize,
  getColumnCount,
  getWidth,
  getHeight,
  filterUniqueNames,
}

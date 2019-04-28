import React from 'react'
import { render } from 'react-dom'
import { FixedSizeGrid as Grid, FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import names from './names'

import './index.scss'

const log = console.log

// log(`hi`, names)

// const Cell2 = ({ index, style }) => (
//   <img
//     style={style}
//     src={`../images/undraw/${names[index]}`}
//     alt={`${names[index]}`}
//   />
// )

// const getItemSize = (width, height) => {
//   // log(`getItemsSize ${width}x${height}`)
//   return width / 5
// }

// const Example = () => (
//   <AutoSizer>
//     {({ height, width }) => (
//       <List
//         className='List'
//         height={height}
//         width={width}
//         itemCount={names.length}
//         itemSize={getItemSize(width, height)}
//       >
//         {Cell2}
//       </List>
//     )}
//   </AutoSizer>
// )
const imageWidth = 375
const imageHeight = 280
const getColumnCount = (width, height) => 3
const getWidth = width => imageWidth
const getHeight = height => imageHeight

const Cell = (width, height) => ({ rowIndex, columnIndex, style }) => {
  log(
    `cell rowIndex, columnIndex, style`,
    rowIndex,
    columnIndex,
    style,
    width,
    height
  )
  const columnCount = getColumnCount(width, height)
  const index = columnCount * rowIndex + columnIndex

  return (
    <img
      style={style}
      src={`../images/undraw/${names[index]}`}
      alt={`${names[index]}`}
    />
  )
}

const Example = () => (
  <AutoSizer>
    {({ width, height }) => (
      <Grid
        className='Grid'
        height={height}
        width={width}
        columnCount={getColumnCount(width, height)}
        rowCount={names.length / getColumnCount(width, height)}
        columnWidth={getWidth(width)}
        rowHeight={getHeight(height)}
      >
        {Cell(width, height)}
      </Grid>
    )}
  </AutoSizer>
)

function App() {
  return (
    <>
      <header>
        <h1 className='title'>Search here!</h1>
      </header>
      <main>
        <Example />
      </main>
    </>
  )
}

// const Cell = ({ columnIndex, rowIndex, style }) => (
//   <div
//     className={
//       columnIndex % 2
//         ? rowIndex % 2 === 0
//           ? 'GridItemOdd'
//           : 'GridItemEven'
//         : rowIndex % 2
//           ? 'GridItemOdd'
//           : 'GridItemEven'
//     }
//     style={style}
//   >
//     r{rowIndex}, c{columnIndex}
//   </div>
// )
// const Example = () => (
//   <AutoSizer>
//     {({ height, width }) => (
//       <Grid
//         className='Grid'
//         height={height}
//         width={width}
//         columnCount={3}
//         rowCount={names.length}
//         columnWidth={150}
//         rowHeight={100}
//       >
//         {Cell2}
//       </Grid>
//     )}
//   </AutoSizer>
// )

render(<App />, document.getElementById('root'))

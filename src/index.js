import React from 'react'
import { render } from 'react-dom'
import { FixedSizeGrid as Grid, FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import names from './names'

import './index.scss'

const log = console.log

log(`hi`, names)

const Cell2 = ({ index, style }) => (
  <img
    style={style}
    src={`../images/undraw/${names[index]}`}
    alt={`${names[index]}`}
  />
)

const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        className='List'
        height={height}
        width={width}
        itemCount={names.length}
        itemSize={200}
      >
        {Cell2}
      </List>
    )}
  </AutoSizer>
)

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

render(<Example />, document.getElementById('root'))

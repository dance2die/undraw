import React from 'react'
import { render } from 'react-dom'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import './index.scss'

const log = console.log

log(`hi`)

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div
    className={
      columnIndex % 2
        ? rowIndex % 2 === 0
          ? 'GridItemOdd'
          : 'GridItemEven'
        : rowIndex % 2
        ? 'GridItemOdd'
        : 'GridItemEven'
    }
    style={style}
  >
    r{rowIndex}, c{columnIndex}
  </div>
)

const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <Grid
        className='Grid'
        height={height}
        width={width}
        columnCount={1000}
        columnWidth={100}
        rowCount={1000}
        rowHeight={35}
      >
        {Cell}
      </Grid>
    )}
  </AutoSizer>
)

render(<Example />, document.getElementById('root'))

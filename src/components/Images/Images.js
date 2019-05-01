import React, { useContext } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { getColumnCount, getWidth, getHeight } from '../../utils'
import Cell from './Cell'
import FileNamesContext from '../FileNamesContext'

const Images = () => {
  const fileNames = useContext(FileNamesContext)

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Grid
          className='Grid'
          height={height}
          width={width}
          columnCount={getColumnCount(width)}
          rowCount={fileNames.length / getColumnCount(width)}
          columnWidth={getWidth(width)}
          rowHeight={getHeight(width)}
        >
          {Cell(width)}
        </Grid>
      )}
    </AutoSizer>
  )
}

export default Images

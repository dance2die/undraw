import React, { useContext } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { getColumnCount, getWidth, getHeight } from '../../utils'
import FileNamesContext from '../FileNamesContext'
import Cell from './Cell'
import NoResult from './NoResult'

const Images = () => {
  const fileNames = useContext(FileNamesContext)
  const hasFiles = fileNames.length > 0

  return (
    <>
      {hasFiles && (
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
      )}

      {!hasFiles && <NoResult />}
    </>
  )
}

export default Images

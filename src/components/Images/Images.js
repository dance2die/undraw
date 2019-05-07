import React, { useRef, useContext, useState } from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { getColumnCount, getWidth, getHeight } from '../../utils'
import FileNamesContext from '../FileNamesContext'
import Cell from './Cell'
import NoResult from './NoResult'

const Images = () => {
  const fileNames = useContext(FileNamesContext)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [gridHeight, setGridHeight] = useState(0)
  const gridRef = useRef(undefined)

  const hasFiles = fileNames.length > 0

  const handleKeyDown = event => {
    const { keyCode } = event

    const [pageUp, pageDown, arrowUp, arrowDown] = [33, 34, 38, 40]
    const pageOffset = gridHeight * 2
    const arrowOffset = gridHeight / 2

    const keys = {
      [pageUp]: Math.max(0, scrollOffset - pageOffset),
      [pageDown]: scrollOffset + pageOffset,
      [arrowUp]: Math.max(0, scrollOffset - arrowOffset),
      [arrowDown]: scrollOffset + arrowOffset,
    }

    if (keys[keyCode]) {
      gridRef.current.scroll({
        left: 0,
        top: keys[keyCode],
        behavior: 'auto',
      })

      setScrollOffset(keys[keyCode])
    }
  }

  const onScroll = e => {
    // console.log(`onScroll`, e)
    setScrollOffset(e.scrollTop)
  }

  return (
    <div className='main' onKeyDown={handleKeyDown} tabIndex='0'>
      {hasFiles && (
        <AutoSizer>
          {({ width, height }) => {
            setGridHeight(height)

            return (
              <Grid
                outerRef={gridRef}
                onScroll={onScroll}
                className='Grid'
                height={height}
                width={width}
                columnCount={getColumnCount(width)}
                rowCount={fileNames.length / getColumnCount(width)}
                columnWidth={getWidth(width) - 10}
                rowHeight={getHeight(width) - 10}
              >
                {Cell(width)}
              </Grid>
            )
          }}
        </AutoSizer>
      )}

      {!hasFiles && <NoResult />}
    </div>
  )
}

export default Images

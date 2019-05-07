import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
  useState,
} from 'react'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { getColumnCount, getWidth, getHeight, debounce } from '../../utils'
import FileNamesContext from '../FileNamesContext'
import Cell from './Cell'
import NoResult from './NoResult'

const Images = () => {
  const fileNames = useContext(FileNamesContext)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [gridHeight, setGridHeight] = useState(0)
  // const [scrollUpdateWasRequested, setScrollUpdateWasRequested] = useState(
  //   false
  // )
  const gridRef = useRef(undefined)

  const hasFiles = fileNames.length > 0

  const [pageUp, pageDown, arrowUp, arrowDown, end, home] = [
    33,
    34,
    38,
    40,
    35,
    36,
  ]
  const pageOffset = gridHeight * 2
  const arrowOffset = gridHeight / 2
  const maxHeight =
    (gridRef.current &&
      gridRef.current.firstElementChild.style.height.replace('px', '')) ||
    gridHeight

  const minHeight = 0.1

  const keys = {
    [pageUp]: Math.max(minHeight, scrollOffset - pageOffset),
    [pageDown]: Math.min(scrollOffset + pageOffset, maxHeight),
    [arrowUp]: Math.max(minHeight, scrollOffset - arrowOffset),
    [arrowDown]: Math.min(scrollOffset + arrowOffset, maxHeight),
    [end]: maxHeight,
    [home]: minHeight,
  }

  const handleKeyDown = ({ keyCode }) => {
    keys[keyCode] && setScrollOffset(keys[keyCode])
  }

  useLayoutEffect(() => {
    gridRef.current &&
      gridRef.current.scrollTo({
        left: 0,
        top: scrollOffset,
        behavior: 'auto',
      })
  })

  const onScroll = ({ scrollTop, scrollUpdateWasRequested }) => {
    // if (!scrollUpdateWasRequested) setScrollOffset(scrollTop)
    // setScrollUpdateWasRequested(scrollUpdateWasRequested)
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

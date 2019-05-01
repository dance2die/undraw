import React, { useContext } from 'react'

import { getColumnCount } from '../../utils'
import FileNamesContext from '../FileNamesContext'

const Cell = width => ({ rowIndex, columnIndex, style }) => {
  const fileNames = useContext(FileNamesContext)
  const columnCount = getColumnCount(width)
  const index = columnCount * rowIndex + columnIndex

  return (
    <>
      {fileNames[index] && (
        <img
          style={style}
          src={`../images/svg/${fileNames[index]}`}
          alt={`${fileNames[index]}`}
        />
      )}
    </>
  )
}

export default Cell

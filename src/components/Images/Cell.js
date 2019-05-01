import React, { useContext } from 'react'

import { getColumnCount } from '../../utils'
import FileNamesContext from '../FileNamesContext'

const Image = ({ style, src }) => <img style={style} src={src} alt={src} />

const Cell = width => ({ rowIndex, columnIndex, style }) => {
  const fileNames = useContext(FileNamesContext)
  const columnCount = getColumnCount(width)
  const index = columnCount * rowIndex + columnIndex

  return (
    <>
      {fileNames[index] && (
        <Image style={style} src={`../images/svg/${fileNames[index]}`} />
      )}
    </>
  )
}

export default Cell

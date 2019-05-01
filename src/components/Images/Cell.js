import React, { useContext } from 'react'

import { getColumnCount } from '../../utils'
import FileNamesContext from '../FileNamesContext'

const Image = ({ style, file: { image, tags, title } }) => (
  <section className='image'>
    <img style={style} src={`../images/svg/${image}`} alt={title} />
    <div className='overlay'>{tags}</div>
  </section>
)

const Cell = width => ({ rowIndex, columnIndex, style }) => {
  const fileNames = useContext(FileNamesContext)
  const columnCount = getColumnCount(width)
  const index = columnCount * rowIndex + columnIndex

  return (
    <>{fileNames[index] && <Image style={style} file={fileNames[index]} />}</>
  )
}

export default Cell

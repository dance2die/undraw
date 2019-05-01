import React, { useState, useContext } from 'react'

import { getColumnCount } from '../../utils'
import FileNamesContext from '../FileNamesContext'

const Image = ({ style, file: { image, tags, title } }) => {
  const [hover, setHover] = useState(false)

  return (
    <section
      className='image'
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        style={{ width: '100%', height: '100%' }}
        src={`../images/svg/${image}`}
        alt={title}
      />
      <div className={`overlay${hover ? ' hover' : ''}`}>{tags}</div>
    </section>
  )
}

const Cell = width => ({ rowIndex, columnIndex, style }) => {
  const fileNames = useContext(FileNamesContext)
  const columnCount = getColumnCount(width)
  const index = columnCount * rowIndex + columnIndex

  return (
    <>{fileNames[index] && <Image style={style} file={fileNames[index]} />}</>
  )
}

export default Cell

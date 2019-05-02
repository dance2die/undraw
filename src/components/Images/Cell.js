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
      <article>
        <img
          style={{ width: '100%', height: '80%' }}
          src={`../images/svg/${image}`}
          alt={title}
        />
        <div
          style={{ width: style.width }}
          className={`overlay${hover ? ' hover' : ''}`}
        >
          <span className='tags'>{tags}</span>
        </div>
      </article>
      <h4 className='title'>{title}</h4>
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

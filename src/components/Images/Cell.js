import React, { useState, useContext } from 'react'

import { getColumnCount } from '../../utils'
import FileNamesContext from '../FileNamesContext'

const Image = ({ style, file: { image, tags, title } }) => {
  const [hover, setHover] = useState(false)
  const imageUrl = `../images/svg/${image}`

  return (
    <section
      className='image'
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <article>
        <img
          style={{ width: '100%', height: '60%' }}
          src={imageUrl}
          alt={title}
        />
        <div
          style={{ width: style.width }}
          className={`overlay${hover ? ' hover' : ''}`}
        >
          <a className='download' href={imageUrl} download={title}>
            Download
          </a>
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

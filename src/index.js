import React, { useState, createContext, useContext } from 'react'
import { render } from 'react-dom'
import { FixedSizeGrid as Grid, FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import names from './names'
import useTrie from '@cshooks/usetrie'

import './index.scss'

const log = console.log

const FileNamesContext = createContext()

const imageWidth = 375
const imageHeight = 280
const getColumnCount = width => ~~(width / imageWidth)
const getWidth = width =>
  Math.max(imageWidth, ~~(width / getColumnCount(width, 0))) - 10
const getHeight = width => imageHeight

const Cell = width => ({ rowIndex, columnIndex, style }) => {
  const fileNames = useContext(FileNamesContext)

  const columnCount = getColumnCount(width)
  log(`cell columnCount=${columnCount}`)
  const index = columnCount * rowIndex + columnIndex

  return (
    <>
      {fileNames[index] && (
        <img
          style={style}
          src={`../images/undraw/${fileNames[index]}`}
          alt={`${fileNames[index]}`}
        />
      )}
    </>
  )
}

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

function App() {
  const trie = useTrie(names)
  const [fileNames, setFileNames] = useState(names)

  const filterByQuery = e => {
    const { value: query } = e.target
    e.preventDefault()

    const words = trie.search(query)
    log(`query=${query}`, words)
    setFileNames(words.length === 0 ? names : words)
  }

  return (
    <FileNamesContext.Provider value={fileNames}>
      <section className='search'>
        <h1 className='title'>Search here!</h1>
        <form onSubmit={filterByQuery}>
          <input type='text' onChange={filterByQuery} placeholder='Search' />
        </form>
      </section>
      <main>
        <Images />
      </main>
    </FileNamesContext.Provider>
  )
}

render(<App />, document.getElementById('root'))

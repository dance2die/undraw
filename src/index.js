import React, { useState, createContext, useContext } from 'react'
import { render } from 'react-dom'
import { FixedSizeGrid as Grid, FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import useTrie from '@cshooks/usetrie'

import names from './names'
import { getColumnCount, getWidth, getHeight } from './utils'

import './index.scss'

const log = console.log

const FileNamesContext = createContext()

const Cell = width => ({ rowIndex, columnIndex, style }) => {
  const fileNames = useContext(FileNamesContext)

  const columnCount = getColumnCount(width)
  // log(`cell columnCount=${columnCount}`)
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

function Search({ filterByQuery }) {
  return (
    <section className='search'>
      <h1 className='title'>Search Images</h1>
      <form onSubmit={filterByQuery}>
        <input type='text' onChange={filterByQuery} placeholder='Search' />
      </form>
    </section>
  )
}

function App() {
  const trie = useTrie(names)
  const [fileNames, setFileNames] = useState(names)

  const filterByQuery = e => {
    const { value: query } = e.target
    e.preventDefault()

    const words = trie.search(query)
    const hasNoResult =
      query && words && query.length === 0 && words.length === 0
    setFileNames(hasNoResult ? names : words)
  }

  return (
    <FileNamesContext.Provider value={fileNames}>
      <Search filterByQuery={filterByQuery} />
      <main>
        <Images />
      </main>
    </FileNamesContext.Provider>
  )
}

render(<App />, document.getElementById('root'))

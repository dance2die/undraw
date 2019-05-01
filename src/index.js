import React, { useState, useContext } from 'react'
import { render } from 'react-dom'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import useTrie from '@cshooks/usetrie'

import { getColumnCount, getWidth, getHeight, normalize } from './utils'
import localNames from './data/undraw-local.json'
import FileNamesContext from './FileNamesContext'

import './index.scss'

const log = console.log

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
  const allNames = localNames.map(o => o.image)
  const normalizedNames = normalize(localNames)
  const trie = useTrie(normalizedNames, false, o => o.type)
  const [fileNames, setFileNames] = useState(allNames)

  const filterByQuery = e => {
    const { value: query } = e.target
    e.preventDefault()

    const searchResult = trie.search(query)
    const fileNames = searchResult.reduce((acc, o) => {
      return acc.concat(...o.payload.map(name => name.image))
    }, [])

    // log(`fileNames`, searchResult)
    const hasNoResult = !query || (query.length === 0 && fileNames.length === 0)
    setFileNames(hasNoResult ? allNames : fileNames)
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

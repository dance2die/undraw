import React, { useState } from 'react'
import { render } from 'react-dom'
import useTrie from '@cshooks/usetrie'

import { normalize } from './utils'
import localNames from './data/undraw-local.json'
import FileNamesContext from './components/FileNamesContext'
import Search from './components/Search'
import Images from './components/Images'

import './index.scss'

const log = console.log

function App() {
  const allNames = localNames.map(o => o.image)
  const normalizedNames = normalize(localNames)
  const trie = useTrie(normalizedNames, false, o => o.type)
  const [fileNames, setFileNames] = useState(allNames)

  const filterByQuery = e => {
    e.preventDefault()
    const { value: query } = e.target
    if (!query) return

    const searchResult = trie.search(query)
    const fileNames = searchResult.reduce((acc, o) => {
      return acc.concat(...o.payload.map(name => name.image))
    }, [])

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

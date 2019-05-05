import React, { useState } from 'react'
import { render } from 'react-dom'
import useTrie from '@cshooks/usetrie'

import { normalize, filterUniqueNames } from './utils'
import localNames from './data/undraw-local.json'
import FileNamesContext from './components/FileNamesContext'
import Search from './components/Search'
import Images from './components/Images'

import './styles/index.scss'

const log = console.log

const normalizedNames = normalize(localNames)

function App() {
  const trie = useTrie(normalizedNames, false, o => o.type)
  const [fileNames, setFileNames] = useState(localNames)

  const filterByQuery = e => {
    e.preventDefault()
    const { value: query } = e.target
    if (!query) {
      setFileNames(localNames)
      return
    }

    const found = trie.search(query.toLowerCase())
    const foundNames = found.reduce((acc, o) => {
      return acc.concat(...o.payload)
    }, [])

    const uniqueNames = filterUniqueNames(foundNames)

    const hasNoResult = query.length === 0 && uniqueNames.length === 0
    setFileNames(hasNoResult ? localNames : uniqueNames)
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

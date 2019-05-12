import React, { useState, useCallback } from 'react'

import useTrie from '@cshooks/usetrie'

import { normalize, filterUniqueNames, debounce } from '../utils'
import localNames from '../data/undraw-local.json'
import FileNamesContext from './FileNamesContext'
import Search from './Search'
import Images from './Images'

const normalizedNames = normalize(localNames)

function Home() {
  const trie = useTrie(normalizedNames, false, o => o.type)
  const [fileNames, setFileNames] = useState(localNames)

  const filterByQuery = query => {
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

  const filterByQueryCallback = useCallback(debounce(filterByQuery, 100), [
    filterByQuery,
  ])

  return (
    <FileNamesContext.Provider value={fileNames}>
      <Search filterByQuery={filterByQueryCallback} />
      <Images />
    </FileNamesContext.Provider>
  )
}

export default Home

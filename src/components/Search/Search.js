import React, { useState } from 'react'

import './Search.scss'

function Search({ filterByQuery }) {
  const [query, setQuery] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    filterByQuery(query)
  }

  const onChange = e => {
    const { value: query } = e.target
    filterByQuery(query)
    setQuery(query)
  }

  const ESCAPE_KEYCODE = 27
  const onEscape = ({ keyCode }) => {
    if (keyCode === ESCAPE_KEYCODE) {
      setQuery('')
      filterByQuery('')
    }
  }

  return (
    <section className='search'>
      <h1 className='title'>Search Undraw Images</h1>
      <form onSubmit={onSubmit}>
        <input
          value={query}
          type='text'
          onKeyDown={onEscape}
          onChange={onChange}
          placeholder='Search'
        />
      </form>
    </section>
  )
}

export default Search

import React, { memo, useState, useRef, useLayoutEffect } from 'react'

import './Search.scss'

function Search({ filterByQuery }) {
  console.log(`Search is renredering...`)
  const [query, setQuery] = useState('')
  const queryRef = useRef(undefined)

  useLayoutEffect(() => queryRef.current.focus(), [])

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
          ref={queryRef}
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

export default memo(Search)

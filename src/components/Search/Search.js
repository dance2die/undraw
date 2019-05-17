import React, { memo, useRef, useLayoutEffect } from 'react'
import Menu from '../Menu'

import './Search.scss'

function Search({ filterByQuery }) {
  const queryRef = useRef(undefined)

  useLayoutEffect(() => queryRef.current.focus(), [])

  const onSubmit = e => {
    e.preventDefault()
    filterByQuery(queryRef.current.value)
  }

  const onChange = () => {
    filterByQuery(queryRef.current.value)
  }

  const ESCAPE_KEYCODE = 27
  const onEscape = ({ keyCode }) => {
    if (keyCode === ESCAPE_KEYCODE) {
      filterByQuery('')
      queryRef.current.value = ''
    }
  }

  return (
    <section className='search'>
      <header>
        <Menu />
        <h1 className='title'>🔎Search Undraw Images</h1>
      </header>
      <form onSubmit={onSubmit}>
        <input
          ref={queryRef}
          aria-label='Search Undraw Illustration'
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

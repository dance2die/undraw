import React from 'react'

import './Search.scss'

function Search({ filterByQuery }) {
  return (
    <section className='search'>
      <h1 className='title'>Search Undraw Images</h1>
      <form onSubmit={filterByQuery}>
        <input type='text' onChange={filterByQuery} placeholder='Search' />
      </form>
    </section>
  )
}

export default Search

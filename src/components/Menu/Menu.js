import React, { useState } from 'react'
import { Link } from '@reach/router'

import './Menu.scss'

function Menu() {
  const [isClicked, setIsClicked] = useState(false)
  const toggleLinks = () => setIsClicked(isClicked => !isClicked)

  return (
    <nav className='menu'>
      <section className={`links${isClicked ? ' selected' : ''}`}>
        <Link to='/About'>About</Link>
      </section>
      <section
        className={`hamburger${isClicked ? ' selected' : ''}`}
        onClick={toggleLinks}
      >
        <div className='bar1' />
        <div className='bar2' />
        <div className='bar3' />
      </section>
    </nav>
  )
}

export default Menu

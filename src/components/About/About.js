import React from 'react'
import { Link } from '@reach/router'

import { ExternalLink } from '../../utils'

import './About.scss'

function AboutWhat() {
  return (
    <section className='about-what'>
      <h2>What is this site?</h2>
      <p>
        This is an Offline-first (Cache first, then network PWA strategy){' '}
        <ExternalLink url='https://developers.google.com/web/progressive-web-apps/'>
          PWA (Progressive Web App)
        </ExternalLink>{' '}
        for searching for{' '}
        <ExternalLink url='https://undraw.co/illustrations'>
          Undraw Illustrations.
        </ExternalLink>
      </p>
      <i>Yes, this site works offline~</i>
    </section>
  )
}

function AboutCredit() {
  return (
    <section className='about-credit'>
      <h2>Credits</h2>
      <article>
        I am not affiliated with Undraw and for Undraw Illustration license,
        refer to their{' '}
        <ExternalLink url='https://undraw.co/license'>
          license page
        </ExternalLink>
        .
      </article>
      <ul>
        <li>
          <ExternalLink url='https://undraw.co/illustrations'>
            Official Undraw Illustrations
          </ExternalLink>
        </li>
        <li>
          <ExternalLink url='https://github.com/pshah123/undraw-illustrations'>
            Unofficial Mirror - for images &amp; JSON metadata
          </ExternalLink>
        </li>
      </ul>
    </section>
  )
}

function AboutLicense() {
  return (
    <section className='about-license'>
      <h2>License</h2>
      <article>
        The license of this site is{' '}
        <ExternalLink url='https://github.com/dance2die/undraw/blob/master/LICENSE'>
          MIT
        </ExternalLink>
      </article>
    </section>
  )
}

function About() {
  return (
    <article className='about'>
      <Link className='go-back' to='/'>
        🔙 Home
      </Link>
      <div className='box'>
        <AboutWhat />
        <AboutCredit />
        <AboutLicense />
      </div>
    </article>
  )
}

export default About

import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/cognitive', label: 'Cognitive' },
    { to: '/hearing', label: 'Hearing' },
    { to: '/visual', label: 'Visual' },
    { to: '/mobility', label: 'Mobility' },
    { to: '/speech', label: 'Speech' },
    { to: '/neurodivergent', label: 'Neurodivergent' },
  ]

  return (
    <nav className="site-header" aria-label="Main navigation">
      <a className="brand" href="/">EnableHub</a>
      <div className="nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

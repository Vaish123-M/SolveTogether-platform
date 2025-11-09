import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AccessibilityBar from './AccessibilityBar'

export default function Navbar() {
  const location = useLocation()
  
  
  useEffect(()=>{
    function onDoc(e){
      if(!accRef.current) return
      if(!accRef.current.contains(e.target)) setShowAccessibility(false)
    }
    function onKey(e){ if(e.key === 'Escape') setShowAccessibility(false) }
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return ()=>{
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [accRef])
  const links = [
    { to: '/', label: 'Home', emoji: '🏠' },
    { to: '/cognitive', label: 'Cognitive', emoji: '🧠' },
    { to: '/hearing', label: 'Hearing', emoji: '🦻' },
    { to: '/visual', label: 'Visual', emoji: '🦯' },
    { to: '/mobility', label: 'Mobility', emoji: '🦽' },
    { to: '/speech', label: 'Speech', emoji: '🗣️' },
    { to: '/neurodivergent', label: 'Neurodivergent', emoji: '🧩' },
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
            style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 8px', borderRadius:8}}
          >
            <span aria-hidden="true">{l.emoji}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="nav-actions">
        {/* Render full accessibility controls inline in the navbar */}
        <AccessibilityBar inline={true} />
      </div>
    </nav>
  )
}

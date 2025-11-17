import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AccessibilityBar from './AccessibilityBar'
import UserSettingsPanel from './UserSettingsPanel'
import Magnifier from './Magnifier'
import ScreenReaderCheck from './ScreenReaderCheck'
import KeyboardGuide from './KeyboardGuide'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function Navbar() {
  const location = useLocation()
  const [showSettings, setShowSettings] = useState(false)
  const { setMagnifierEnabled, setKeyboardGuideVisible } = useAccessibility()

  useEffect(()=>{
    function onToggleMagnifier(){ setMagnifierEnabled(v=>!v) }
    function onToggleKeyboard(){ setKeyboardGuideVisible(v=>!v) }
    function onCloseKeyboard(){ setKeyboardGuideVisible(false) }
    window.addEventListener('toggleMagnifier', onToggleMagnifier)
    window.addEventListener('toggleKeyboardGuide', onToggleKeyboard)
    window.addEventListener('closeKeyboardGuide', onCloseKeyboard)
    return ()=>{
      window.removeEventListener('toggleMagnifier', onToggleMagnifier)
      window.removeEventListener('toggleKeyboardGuide', onToggleKeyboard)
      window.removeEventListener('closeKeyboardGuide', onCloseKeyboard)
    }
  },[setMagnifierEnabled, setKeyboardGuideVisible])
  
  const links = [
    { to: '/', label: 'Home', emoji: '🏠' },
    { to: '/cognitive', label: 'Cognitive', emoji: '🧠' },
    { to: '/hearing', label: 'Hearing', emoji: '🦻' },
    { to: '/visual', label: 'Visual', emoji: '🦯' },
    { to: '/mobility', label: 'Mobility', emoji: '🦽' },
    { to: '/speech', label: 'Speech', emoji: '🗣️' },
    { to: '/neurodivergent', label: 'Neurodivergent', emoji: '🧩' },
    { to: '/showcase', label: 'Showcase', emoji: '💡' },
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
        <button aria-label="Open user settings" title="Settings" onClick={()=>setShowSettings(true)} className="accessibility-button" style={{marginLeft:8}}>⚙️</button>
        <UserSettingsPanel open={showSettings} onClose={()=>setShowSettings(false)} />
        <Magnifier />
        <ScreenReaderCheck />
        <KeyboardGuide />
      </div>
    </nav>
  )
}

import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AccessibilityBar from './AccessibilityBar'
import UserSettingsPanel from './UserSettingsPanel'
import Magnifier from './Magnifier'
import ScreenReaderCheck from './ScreenReaderCheck'
import KeyboardGuide from './KeyboardGuide'
import { HomeIcon, BrainIcon, EarIcon, EyeIcon, WheelchairIcon, SpeechIcon, PuzzleIcon, LightbulbIcon } from './icons'
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
    { to: '/', label: 'Home', icon: <HomeIcon size={24} /> },
    { to: '/cognitive', label: 'Cognitive', icon: <BrainIcon size={24} /> },
    { to: '/hearing', label: 'Hearing', icon: <EarIcon size={24} /> },
    { to: '/visual', label: 'Visual', icon: <EyeIcon size={24} /> },
    { to: '/mobility', label: 'Mobility', icon: <WheelchairIcon size={24} /> },
    { to: '/speech', label: 'Speech', icon: <SpeechIcon size={24} /> },
    { to: '/neurodivergent', label: 'Neurodivergent', icon: <PuzzleIcon size={24} /> },
    { to: '/showcase', label: 'Showcase', icon: <LightbulbIcon size={24} /> },
  ]

  return (
    <header className="site-header" role="banner">
      <a className="skip-link" href="#main">Skip to main content</a>
      <a className="brand" href="/" aria-label="EnableHub home">EnableHub</a>
      <nav className="nav" aria-label="Main navigation">
        {links.map((l) => {
          const labelId = `nav-${l.label.toLowerCase().replace(/\s+/g,'-')}-label`
          return (
            <NavLink
              key={l.to}
              to={l.to}
              className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
              aria-labelledby={labelId}
              style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 8px', borderRadius:8}}
              end
            >
              {({isActive}) => (
                  <>
                    <span aria-hidden="true" style={{display:'inline-flex', alignItems:'center', gap:8}}>{l.icon}</span>
                    <span id={labelId} className="nav-label">{l.label}</span>
                    <span aria-current={isActive ? 'page' : undefined} style={{display:'none'}} />
                  </>
                )}
            </NavLink>
          )
        })}
      </nav>

      <div className="nav-actions">
        {/* Render full accessibility controls inline in the navbar */}
        <AccessibilityBar inline={true} />
        <button aria-label="Open user settings" title="Settings" onClick={()=>setShowSettings(true)} className="accessibility-button" style={{marginLeft:8}}>⚙️</button>
        <UserSettingsPanel open={showSettings} onClose={()=>setShowSettings(false)} />
        <Magnifier />
        <ScreenReaderCheck />
        <KeyboardGuide />
      </div>
    </header>
  )
}

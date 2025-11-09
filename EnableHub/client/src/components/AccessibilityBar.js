import React from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

// AccessibilityBar can be rendered inline or compact (popup) when used in Navbar
export default function AccessibilityBar({ compact = false, inline = false }){
  const { dark, setDark, contrast, setContrast, fontSize, setFontSize, tts, setTts, speak, reset } = useAccessibility()

  const dec = ()=> setFontSize(String(Math.max(12, Number(fontSize) - 1)))
  const inc = ()=> setFontSize(String(Math.min(24, Number(fontSize) + 1)))

  const toggleTts = (enabled)=>{
    setTts(enabled)
    if(enabled) speak('Text to speech enabled')
  }

  // root class changes slightly when compact to allow popover styling
  const rootClass = compact ? 'accessibility-bar compact' : inline ? 'accessibility-bar inline' : 'accessibility-bar'

  return (
    <div className={rootClass} role="region" aria-label="Accessibility settings">
      <div className="accessibility-controls">
        <div className="toggle-group">
             <IconToggle on={dark} onClick={()=>setDark(!dark)} title="Toggle dark mode" />
             <span className="sr-only">Dark mode</span>
        </div>

        <div className="toggle-group">
             <IconToggle on={contrast} onClick={()=>setContrast(!contrast)} title="Toggle high contrast" />
             <span className="sr-only">High contrast</span>
        </div>

        <div className="font-controls">
          <button className="btn" aria-label="Decrease font size" onClick={dec}>-A</button>
          <div className="font-size-display" aria-live="polite">{fontSize}px</div>
          <button className="btn" aria-label="Increase font size" onClick={inc}>+A</button>
        </div>

        <div className="toggle-group">
             <IconToggle on={tts} onClick={()=>toggleTts(!tts)} title="Toggle text-to-speech" />
             <span className="sr-only">Text to speech</span>
        </div>

        <div style={{marginLeft:12}}>
          <button className="btn btn-secondary" onClick={reset}>Reset preferences</button>
        </div>
      </div>
    </div>
  )
}


function IconToggle({on, onClick, title}){
  // simple SVG toggle: circle moves within rounded rect
  // keyboard: Enter or Space should toggle
  function handleKey(e){
    if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
      e.preventDefault()
      onClick()
    }
  }

  return (
    <button
      className={`svg-toggle ${on ? 'on' : ''}`}
      onClick={onClick}
      onKeyDown={handleKey}
      aria-pressed={on}
      title={title}
      style={{background:'transparent',border:'none',padding:6,cursor:'pointer'}}
      tabIndex={0}
    >
      <svg width="40" height="24" viewBox="0 0 40 24" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" rx="12" ry="12" width="40" height="24" fill={on ? 'url(#g)' : 'rgba(0,0,0,0.08)'} />
        <circle cx={on ? 28 : 12} cy="12" r="8" fill="#fff" stroke="rgba(0,0,0,0.06)" />
      </svg>
    </button>
  )
}

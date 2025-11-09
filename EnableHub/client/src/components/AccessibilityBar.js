import React from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function AccessibilityBar(){
  const { dark, setDark, contrast, setContrast, fontSize, setFontSize, tts, setTts, speak, reset } = useAccessibility()

  const dec = ()=> setFontSize(String(Math.max(12, Number(fontSize) - 1)))
  const inc = ()=> setFontSize(String(Math.min(24, Number(fontSize) + 1)))

  const toggleTts = (enabled)=>{
    setTts(enabled)
    if(enabled) speak('Text to speech enabled')
  }

  return (
    <div className="accessibility-bar" role="region" aria-label="Accessibility settings">
      <div className="accessibility-controls">
        <div className="toggle-group">
          <button className={`toggle-switch ${dark ? 'on' : ''}`} aria-pressed={dark} onClick={()=>setDark(!dark)}>
            <span className="toggle-thumb" />
          </button>
          <label>🌓 Dark</label>
        </div>

        <div className="toggle-group">
          <button className={`toggle-switch ${contrast ? 'on' : ''}`} aria-pressed={contrast} onClick={()=>setContrast(!contrast)}>
            <span className="toggle-thumb" />
          </button>
          <label>🎨 High contrast</label>
        </div>

        <div className="font-controls">
          <button className="btn" aria-label="Decrease font size" onClick={dec}>-A</button>
          <div className="font-size-display" aria-live="polite">{fontSize}px</div>
          <button className="btn" aria-label="Increase font size" onClick={inc}>+A</button>
        </div>

        <div className="toggle-group">
          <button className={`toggle-switch ${tts ? 'on' : ''}`} aria-pressed={tts} onClick={()=>toggleTts(!tts)}>
            <span className="toggle-thumb" />
          </button>
          <label>🗣️ TTS</label>
        </div>

        <div style={{marginLeft:12}}>
          <button className="btn btn-secondary" onClick={reset}>Reset preferences</button>
        </div>
      </div>
    </div>
  )
}

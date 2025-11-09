import React, { useEffect, useState } from 'react'

const LS_KEYS = {
  dark: 'eh_dark',
  contrast: 'eh_contrast',
  fontSize: 'eh_fontSize'
}

function readBool(key, def = false){
  try { const v = localStorage.getItem(key); return v === '1' ? true : v === '0' ? false : def } catch(e){ return def }
}

function readFontSize(key){
  try { const v = localStorage.getItem(key); return v || '16' } catch(e){ return '16' }
}

export default function AccessibilityBar(){
  const [dark, setDark] = useState(readBool(LS_KEYS.dark, false))
  const [contrast, setContrast] = useState(readBool(LS_KEYS.contrast, false))
  const [fontSize, setFontSize] = useState(readFontSize(LS_KEYS.fontSize))

  useEffect(()=>{
    try { localStorage.setItem(LS_KEYS.dark, dark ? '1' : '0') } catch(e){}
    const root = document.documentElement
    if(dark) root.classList.add('theme-dark')
    else root.classList.remove('theme-dark')
  },[dark])

  useEffect(()=>{
    try { localStorage.setItem(LS_KEYS.contrast, contrast ? '1' : '0') } catch(e){}
    const root = document.documentElement
    if(contrast) root.classList.add('theme-contrast')
    else root.classList.remove('theme-contrast')
  },[contrast])

  useEffect(()=>{
    try { localStorage.setItem(LS_KEYS.fontSize, fontSize) } catch(e){}
    const root = document.documentElement
    root.style.setProperty('--base-font-size', fontSize + 'px')
  },[fontSize])

  // init on mount (in case localStorage has values)
  useEffect(()=>{
    const initialDark = readBool(LS_KEYS.dark, false)
    const initialContrast = readBool(LS_KEYS.contrast, false)
    const initialFont = readFontSize(LS_KEYS.fontSize)
    setDark(initialDark)
    setContrast(initialContrast)
    setFontSize(initialFont)
    // apply immediately
    if(initialDark) document.documentElement.classList.add('theme-dark')
    if(initialContrast) document.documentElement.classList.add('theme-contrast')
    document.documentElement.style.setProperty('--base-font-size', initialFont + 'px')
  },[])

  return (
    <div className="accessibility-bar" role="region" aria-label="Accessibility settings" style={{display:'flex',gap:10,alignItems:'center',padding:'8px 12px',background:'transparent'}}>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <label style={{display:'inline-flex',alignItems:'center',gap:8}}>
          <input type="checkbox" checked={dark} onChange={(e)=>setDark(e.target.checked)} />
          <span>🌓 Dark</span>
        </label>
        <label style={{display:'inline-flex',alignItems:'center',gap:8}}>
          <input type="checkbox" checked={contrast} onChange={(e)=>setContrast(e.target.checked)} />
          <span>🎨 High contrast</span>
        </label>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <button aria-label="Decrease font size" className="btn" onClick={()=>setFontSize(String(Math.max(12, Number(fontSize) - 1)))}>-A</button>
        <div style={{minWidth:36,textAlign:'center'}} aria-live="polite">{fontSize}px</div>
        <button aria-label="Increase font size" className="btn" onClick={()=>setFontSize(String(Math.min(24, Number(fontSize) + 1)))}>+A</button>
      </div>
    </div>
  )
}

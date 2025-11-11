import React, { createContext, useContext, useEffect, useState } from 'react'

const LS = {
  dark: 'eh_dark',
  contrast: 'eh_contrast',
  fontSize: 'eh_fontSize',
  tts: 'eh_tts'
}

const ROLE_PREFIX = 'eh_settings_'


const AccessibilityContext = createContext(null)

function readBool(key, def = false){
  try { const v = localStorage.getItem(key); return v === '1' ? true : v === '0' ? false : def } catch(e){ return def }
}

function readFont(key){
  try { const v = localStorage.getItem(key); return v || '16' } catch(e){ return '16' }
}

function readInputMethod(key){
  try { const v = localStorage.getItem(key); return v || 'keyboard' } catch(e){ return 'keyboard' }
}

export function AccessibilityProvider({ children }){
  const [dark, setDark] = useState(readBool(LS.dark, false))
  const [contrast, setContrast] = useState(readBool(LS.contrast, false))
  const [fontSize, setFontSize] = useState(readFont(LS.fontSize))
  const [tts, setTts] = useState(readBool(LS.tts, false))
  const [inputMethod, setInputMethod] = useState(readInputMethod('eh_inputMethod'))

  useEffect(()=>{
    try{ localStorage.setItem(LS.dark, dark ? '1' : '0') }catch(e){}
    const root = document.documentElement
    if(dark) root.classList.add('theme-dark')
    else root.classList.remove('theme-dark')
  },[dark])

  useEffect(()=>{
    try{ localStorage.setItem(LS.contrast, contrast ? '1' : '0') }catch(e){}
    const root = document.documentElement
    if(contrast) root.classList.add('theme-contrast')
    else root.classList.remove('theme-contrast')
  },[contrast])

  useEffect(()=>{
    try{ localStorage.setItem(LS.fontSize, fontSize) }catch(e){}
    document.documentElement.style.setProperty('--base-font-size', fontSize + 'px')
  },[fontSize])

  useEffect(()=>{
    try{ localStorage.setItem(LS.tts, tts ? '1' : '0') }catch(e){}
  },[tts])

  useEffect(()=>{
    try{ localStorage.setItem('eh_inputMethod', inputMethod) }catch(e){}
  },[inputMethod])

  // small helper to speak when TTS enabled
  const speak = (text) => {
    if(!tts) return
    try{
      const u = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
    }catch(e){ /* ignore */ }
  }

  const reset = () => {
    setDark(false)
    setContrast(false)
    setFontSize('16')
    setTts(false)
    setInputMethod('keyboard')
  }

  // save/load a named role's preferences to localStorage (no backend available yet)
  const saveSettingsForRole = (role) => {
    if(!role) return
    try{
      const payload = { dark, contrast, fontSize, tts, inputMethod }
      localStorage.setItem(ROLE_PREFIX + role, JSON.stringify(payload))
      return true
    }catch(e){ return false }
  }

  const loadSettingsForRole = (role) => {
    if(!role) return false
    try{
      const raw = localStorage.getItem(ROLE_PREFIX + role)
      if(!raw) return false
      const p = JSON.parse(raw)
      if(p.dark !== undefined) setDark(!!p.dark)
      if(p.contrast !== undefined) setContrast(!!p.contrast)
      if(p.fontSize !== undefined) setFontSize(String(p.fontSize))
      if(p.tts !== undefined) setTts(!!p.tts)
      if(p.inputMethod !== undefined) setInputMethod(p.inputMethod)
      return true
    }catch(e){ return false }
  }

  return (
    <AccessibilityContext.Provider value={{
      dark, setDark,
      contrast, setContrast,
      fontSize, setFontSize,
      tts, setTts,
      inputMethod, setInputMethod,
      speak, reset,
      saveSettingsForRole, loadSettingsForRole
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility(){
  const ctx = useContext(AccessibilityContext)
  if(!ctx) throw new Error('useAccessibility must be used inside AccessibilityProvider')
  return ctx
}

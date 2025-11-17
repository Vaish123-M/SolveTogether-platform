import React, { createContext, useContext, useEffect, useState } from 'react'

const LS = {
  dark: 'eh_dark',
  contrast: 'eh_contrast',
  fontSize: 'eh_fontSize',
  tts: 'eh_tts',
  fontFamily: 'eh_fontFamily',
  lineHeight: 'eh_lineHeight',
  letterSpacing: 'eh_letterSpacing'
}

LS.focus = 'eh_focus'

const ROLE_PREFIX = 'eh_settings_'
const PALETTE_KEY = 'eh_palette'

const PALETTES = [
  { id: 'protanopia', label: 'Protanopia' },
  { id: 'deuteranopia', label: 'Deuteranopia' },
  { id: 'tritanopia', label: 'Tritanopia' }
]


const AccessibilityContext = createContext(null)

function readBool(key, def = false){
  try { const v = localStorage.getItem(key); return v === '1' ? true : v === '0' ? false : def } catch(e){ return def }
}

function readFont(key){
  try { const v = localStorage.getItem(key); return v || '16' } catch(e){ return '16' }
}

function readVar(key, def = ''){
  try{ const v = localStorage.getItem(key); return v || def }catch(e){ return def }
}

function readNumber(key, def = 0){
  try{ const v = localStorage.getItem(key); return v === null ? def : Number(v) }catch(e){ return def }
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
  const [focusMode, setFocusMode] = useState(readBool(LS.focus, false))
  const [palette, setPalette] = useState(() => {
    try{ return localStorage.getItem(PALETTE_KEY) || '' }catch(e){ return '' }
  })
  const [previewPalette, setPreviewPalette] = useState('')
  const [fontFamily, setFontFamily] = useState(() => readVar(LS.fontFamily, ''))
  const [lineHeight, setLineHeight] = useState(() => readVar(LS.lineHeight, '1.45'))
  const [letterSpacing, setLetterSpacing] = useState(() => readVar(LS.letterSpacing, '0'))

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
    try{ localStorage.setItem(LS.fontFamily, fontFamily || '') }catch(e){}
    document.documentElement.style.setProperty('--body-font', fontFamily || "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial")
  },[fontFamily])

  useEffect(()=>{
    try{ localStorage.setItem(LS.lineHeight, String(lineHeight)) }catch(e){}
    document.documentElement.style.setProperty('--body-line-height', String(lineHeight))
  },[lineHeight])

  useEffect(()=>{
    try{ localStorage.setItem(LS.letterSpacing, String(letterSpacing)) }catch(e){}
    document.documentElement.style.setProperty('--body-letter-spacing', String(letterSpacing) + 'px')
  },[letterSpacing])

  useEffect(()=>{
    try{ localStorage.setItem('eh_inputMethod', inputMethod) }catch(e){}
  },[inputMethod])

  // apply palette or preview classes to document root. previewPalette takes precedence.
  useEffect(()=>{
    try{
      const root = document.documentElement
      // remove any existing palette classes
      PALETTES.forEach(p => { root.classList.remove('palette-' + p.id) })
      if(previewPalette){
        root.classList.add('palette-' + previewPalette)
      }else if(palette){
        root.classList.add('palette-' + palette)
      }
    }catch(e){}
  },[palette, previewPalette])

  useEffect(()=>{
    try{ localStorage.setItem(LS.focus, focusMode ? '1' : '0') }catch(e){}
    const root = document.documentElement
    if(focusMode) root.classList.add('focus-mode')
    else root.classList.remove('focus-mode')
  },[focusMode])

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
    setFocusMode(false)
    setFontFamily('')
    setLineHeight('1.45')
    setLetterSpacing('0')
  }

  // save/load a named role's preferences to localStorage (no backend available yet)
  const saveSettingsForRole = (role) => {
    if(!role) return
    try{
      const payload = { dark, contrast, fontSize, tts, inputMethod, fontFamily, lineHeight, letterSpacing }
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
      if(p.fontFamily !== undefined) setFontFamily(p.fontFamily)
      if(p.lineHeight !== undefined) setLineHeight(String(p.lineHeight))
      if(p.letterSpacing !== undefined) setLetterSpacing(String(p.letterSpacing))
      return true
    }catch(e){ return false }
  }

  const listSettingsRoles = () => {
    try{
      const out = []
      for(let i=0;i<localStorage.length;i++){
        const key = localStorage.key(i)
        if(!key) continue
        if(key.startsWith(ROLE_PREFIX)){
          const name = key.slice(ROLE_PREFIX.length)
          try{
            const payload = JSON.parse(localStorage.getItem(key))
            out.push({ name, payload })
          }catch(e){ out.push({ name, payload: null }) }
        }
      }
      return out
    }catch(e){ return [] }
  }

  const deleteSettingsForRole = (role) => {
    if(!role) return false
    try{ localStorage.removeItem(ROLE_PREFIX + role); return true }catch(e){ return false }
  }

  const getAvailablePalettes = () => PALETTES.slice()

  const previewPaletteFn = (id) => {
    if(!id) return false
    try{ setPreviewPalette(id); return true }catch(e){ return false }
  }

  const clearPreviewPalette = () => { try{ setPreviewPalette(''); return true }catch(e){ return false } }

  const applyPalette = (id) => {
    try{
      if(!id){ localStorage.removeItem(PALETTE_KEY); setPalette(''); return true }
      localStorage.setItem(PALETTE_KEY, id)
      setPalette(id)
      setPreviewPalette('')
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
      focusMode, setFocusMode,
      speak, reset,
      saveSettingsForRole, loadSettingsForRole,
      listSettingsRoles, deleteSettingsForRole,
      palette, applyPalette, previewPalette: previewPaletteFn, clearPreviewPalette, getAvailablePalettes
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

import React, { useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography
} from '@mui/material'
import { useAccessibility } from '../context/AccessibilityContext'
import { MoonIcon, ContrastIcon, SpeakerIcon, TargetIcon } from './icons'

// AccessibilityBar can be rendered inline or compact (popup) when used in Navbar
export default function AccessibilityBar({ compact = false, inline = false }){
  const {
    dark,
    setDark,
    contrast,
    setContrast,
    fontSize,
    setFontSize,
    tts,
    setTts,
    focusMode,
    setFocusMode,
    speak,
    reset,
    palette,
    applyPalette,
    getAvailablePalettes
  } = useAccessibility()

  const dec = ()=> setFontSize(String(Math.max(12, Number(fontSize) - 1)))
  const inc = ()=> setFontSize(String(Math.min(24, Number(fontSize) + 1)))

  const toggleTts = (enabled)=>{
    setTts(enabled)
    if(enabled) speak('Text to speech enabled')
  }

  const rootClass = compact ? 'accessibility-bar compact' : inline ? 'accessibility-bar inline' : 'accessibility-bar'
  const palettes = typeof getAvailablePalettes === 'function' ? getAvailablePalettes() : []

  return (
    <Box className={rootClass} role="region" aria-label="Accessibility settings" sx={{ p: 1 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', md: 'center' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <FormControlLabel
            control={<Switch checked={dark} onChange={()=>setDark(!dark)} inputProps={{ 'aria-label': 'Toggle dark mode' }} />}
            label={<Stack direction="row" spacing={0.5} alignItems="center"><MoonIcon size={16} /><span>Dark</span></Stack>}
          />
          <FormControlLabel
            control={<Switch checked={contrast} onChange={()=>setContrast(!contrast)} inputProps={{ 'aria-label': 'Toggle high contrast mode' }} />}
            label={<Stack direction="row" spacing={0.5} alignItems="center"><ContrastIcon size={16} /><span>Contrast</span></Stack>}
          />
          <FormControlLabel
            control={<Switch checked={tts} onChange={()=>toggleTts(!tts)} inputProps={{ 'aria-label': 'Toggle text to speech' }} />}
            label={<Stack direction="row" spacing={0.5} alignItems="center"><SpeakerIcon size={16} /><span>Screen Reader Hints</span></Stack>}
          />
          <FormControlLabel
            control={<Switch checked={focusMode} onChange={()=>setFocusMode(!focusMode)} inputProps={{ 'aria-label': 'Toggle focus mode' }} />}
            label={<Stack direction="row" spacing={0.5} alignItems="center"><TargetIcon size={16} /><span>Focus</span></Stack>}
          />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" aria-label="Font size controls">
          <Button variant="outlined" onClick={dec} aria-label="Decrease font size">A-</Button>
          <Typography aria-live="polite" sx={{ minWidth: 54, textAlign: 'center', fontWeight: 700 }}>{fontSize}px</Typography>
          <Button variant="outlined" onClick={inc} aria-label="Increase font size">A+</Button>
        </Stack>

        {palettes.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 170 }}>
            <InputLabel id="palette-select">Color Theme</InputLabel>
            <Select
              labelId="palette-select"
              value={palette || ''}
              label="Color Theme"
              onChange={(e)=>applyPalette(e.target.value)}
              inputProps={{ 'aria-label': 'Choose color theme profile' }}
            >
              <MenuItem value="">Default</MenuItem>
              {palettes.map(p => <MenuItem key={p.id} value={p.id}>{p.label}</MenuItem>)}
            </Select>
          </FormControl>
        )}

        <Stack direction="row" spacing={1} sx={{ ml: { md: 'auto' } }}>
          <Button variant="outlined" onClick={()=>window.dispatchEvent(new Event('toggleKeyboardGuide'))} aria-label="Open keyboard shortcuts guide">Keyboard</Button>
          <Button variant="outlined" onClick={()=>window.dispatchEvent(new Event('toggleMagnifier'))} aria-label="Toggle screen magnifier">Magnifier</Button>
          <Button variant="contained" color="secondary" onClick={reset} aria-label="Reset accessibility preferences">Reset</Button>
        </Stack>
      </Stack>
    </Box>
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
      role="switch"
      aria-checked={on}
      title={title}
      data-tooltip={title}
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

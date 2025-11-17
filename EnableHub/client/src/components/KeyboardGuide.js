import React from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function KeyboardGuide(){
  const { keyboardGuideVisible } = useAccessibility()
  if(!keyboardGuideVisible) return null
  return (
    <div className="keyboard-guide-overlay" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts guide">
      <div style={{padding:18, maxWidth:720}}>
        <h3 style={{marginTop:0}}>Keyboard navigation guide</h3>
        <ul>
          <li><strong>Tab</strong>: Move focus between interactive controls</li>
          <li><strong>Enter / Space</strong>: Activate focused control</li>
          <li><strong>Arrow keys</strong>: Adjust sliders and similar controls</li>
          <li><strong>Ctrl + M</strong>: Toggle magnifier tool</li>
          <li><strong>Ctrl + K</strong>: Toggle this keyboard guide</li>
          <li><strong>Ctrl + /</strong>: Open quick help (not implemented)</li>
        </ul>
        <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
          <button className="btn" onClick={()=>{ const e = new Event('closeKeyboardGuide'); window.dispatchEvent(e) }}>Close</button>
        </div>
      </div>
    </div>
  )
}

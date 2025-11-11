import React, { useState } from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function UserSettingsPanel({ open, onClose }){
  const { dark, setDark, contrast, setContrast, fontSize, setFontSize, tts, setTts, inputMethod, setInputMethod, saveSettingsForRole, loadSettingsForRole } = useAccessibility()
  const [role, setRole] = useState('learner')
  const [localFont, setLocalFont] = useState(String(fontSize))

  if(!open) return null

  const applyRole = () => {
    const ok = loadSettingsForRole(role)
    if(!ok){
      // nothing saved for role
      // optionally inform user — keep UI minimal, just close
    }
    // update local inputs to reflect loaded values
    setLocalFont(String(fontSize))
  }

  const saveForRole = () => {
    // ensure font value applied
    setFontSize(String(localFont))
    saveSettingsForRole(role)
  }

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-label="User settings">
      <div style={panelStyle}>
        <h3 style={{marginTop:0}}>User settings</h3>

        <label style={rowStyle}>
          Role
          <select value={role} onChange={(e)=>setRole(e.target.value)} style={{marginLeft:8}}>
            <option value="learner">Learner</option>
            <option value="mentor">Mentor</option>
            <option value="contributor">Contributor</option>
          </select>
        </label>

        <div style={rowStyle}>
          <label>High contrast</label>
          <input type="checkbox" checked={contrast} onChange={(e)=>setContrast(e.target.checked)} />
        </div>

        <div style={rowStyle}>
          <label>Dark mode</label>
          <input type="checkbox" checked={dark} onChange={(e)=>setDark(e.target.checked)} />
        </div>

        <div style={rowStyle}>
          <label>Text-to-speech</label>
          <input type="checkbox" checked={tts} onChange={(e)=>setTts(e.target.checked)} />
        </div>

        <div style={rowStyle}>
          <label>Font size</label>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <button className="btn" onClick={()=>setLocalFont(String(Math.max(12, Number(localFont)-1)))}>-A</button>
            <div style={{minWidth:48, textAlign:'center'}}>{localFont}px</div>
            <button className="btn" onClick={()=>setLocalFont(String(Math.min(32, Number(localFont)+1)))}>+A</button>
            <input type="range" min="12" max="32" value={localFont} onChange={(e)=>setLocalFont(e.target.value)} style={{marginLeft:8}} />
            <button className="btn" onClick={()=>setFontSize(String(localFont))}>Apply</button>
          </div>
        </div>

        <div style={rowStyle}>
          <label>Preferred input</label>
          <div style={{display:'flex', gap:8}}>
            <label><input type="radio" name="inputMethod" value="keyboard" checked={inputMethod==='keyboard'} onChange={(e)=>setInputMethod(e.target.value)} /> Keyboard</label>
            <label><input type="radio" name="inputMethod" value="touch" checked={inputMethod==='touch'} onChange={(e)=>setInputMethod(e.target.value)} /> Touch</label>
            <label><input type="radio" name="inputMethod" value="voice" checked={inputMethod==='voice'} onChange={(e)=>setInputMethod(e.target.value)} /> Voice</label>
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:12}}>
          <button className="btn" onClick={applyRole}>Load / Apply role prefs</button>
          <button className="btn btn-primary" onClick={saveForRole}>Save for role</button>
          <button className="btn" onClick={onClose}>Close</button>
        </div>

        <div style={{marginTop:10, fontSize:12, color:'#666'}}>
          Settings are stored locally for each role (e.g. <code>eh_settings_learner</code>). If you later add a backend, these helpers can be wired to a server endpoint to persist across devices.
        </div>
      </div>
    </div>
  )
}

const overlayStyle = {
  position:'fixed', left:0, top:0, right:0, bottom:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:120
}

const panelStyle = {
  background:'var(--card,#fff)', color:'inherit', padding:18, borderRadius:10, width:680, maxWidth:'96%', boxShadow:'0 8px 32px rgba(0,0,0,0.18)'
}

const rowStyle = { display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, margin:'10px 0' }

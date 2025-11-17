import React, { useState, useEffect } from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function UserSettingsPanel({ open, onClose }){
  const { dark, setDark, contrast, setContrast, fontSize, setFontSize, tts, setTts, inputMethod, setInputMethod, saveSettingsForRole, loadSettingsForRole, listSettingsRoles, deleteSettingsForRole, palette, applyPalette, previewPalette: previewPaletteFn, clearPreviewPalette, getAvailablePalettes } = useAccessibility()
  const [profileName, setProfileName] = useState('')
  const [savedProfiles, setSavedProfiles] = useState([])
  const [localFont, setLocalFont] = useState(String(fontSize))
  const [availablePalettes, setAvailablePalettes] = useState([])
  const [previewing, setPreviewing] = useState('')

  if(!open) return null

  const applyRole = () => {
    if(!profileName) return
    const ok = loadSettingsForRole(profileName)
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
    if(!profileName) return
    saveSettingsForRole(profileName)
    refreshProfiles()
  }

  const refreshProfiles = () => {
    try{ setSavedProfiles(listSettingsRoles()) }catch(e){ setSavedProfiles([]) }
  }

  useEffect(()=>{ refreshProfiles() }, [])

  useEffect(()=>{
    try{ setAvailablePalettes(getAvailablePalettes()) }catch(e){ setAvailablePalettes([]) }
  }, [getAvailablePalettes])

  const applyProfile = (name) => {
    const ok = loadSettingsForRole(name)
    if(ok) setLocalFont(String(fontSize))
  }

  const deleteProfile = (name) => {
    if(!name) return
    deleteSettingsForRole(name)
    refreshProfiles()
  }

  const doPreviewPalette = (id) => {
    if(!id) return
    previewPaletteFn(id)
    setPreviewing(id)
  }

  const doClearPreview = () => {
    clearPreviewPalette()
    setPreviewing('')
  }

  const doApplyPalette = (id) => {
    applyPalette(id)
    setPreviewing('')
  }

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-label="User settings">
      <div style={panelStyle}>
        <h3 style={{marginTop:0}}>User settings</h3>

        <label style={rowStyle}>
          Profile name
          <input placeholder="e.g. Dyslexia, Low Vision" value={profileName} onChange={(e)=>setProfileName(e.target.value)} style={{marginLeft:8, flex:1}} />
        </label>

        <div style={{margin:'8px 0'}}>
          <strong>Saved profiles</strong>
          <div style={{marginTop:8, display:'flex', flexDirection:'column', gap:8, maxHeight:160, overflow:'auto'}}>
            {savedProfiles.length===0 && <div style={{color:'#666'}}>No profiles saved yet.</div>}
            {savedProfiles.map(p => (
              <div key={p.name} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, padding:8, borderRadius:6, background:'var(--muted,#f5f5f5)'}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600}}>{p.name}</div>
                  <div style={{fontSize:12, color:'#444'}}>{p.payload ? `font ${p.payload.fontSize}px · ${p.payload.contrast? 'contrast':''} ${p.payload.tts? '· tts':''}` : 'no preview'}</div>
                </div>
                <div style={{display:'flex', gap:6}}>
                  <button className="btn" onClick={()=>applyProfile(p.name)}>Apply</button>
                  <button className="btn" onClick={()=>{ setProfileName(p.name); }}>Select</button>
                  <button className="btn" onClick={()=>deleteProfile(p.name)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{margin:'12px 0'}}>
          <strong>Color-blindness palettes</strong>
          <div style={{marginTop:8, display:'flex', gap:8, alignItems:'flex-start', flexWrap:'wrap'}}>
            {availablePalettes.map(p => (
              <div key={p.id} style={{display:'flex', flexDirection:'column', gap:6, padding:8, borderRadius:8, background:'var(--muted,#f5f5f5)'}}>
                <div style={{fontWeight:700}}>{p.label}</div>
                <div style={{display:'flex', gap:6}}>
                  <button className="btn" onClick={()=>doPreviewPalette(p.id)}>Preview</button>
                  <button className="btn btn-primary" onClick={()=>doApplyPalette(p.id)}>Apply</button>
                </div>
              </div>
            ))}
            <div style={{display:'flex', flexDirection:'column', gap:6}}>
              <button className="btn" onClick={doClearPreview}>Stop Preview</button>
              <button className="btn" onClick={()=>doApplyPalette('')}>Reset Palette</button>
            </div>
          </div>
          <div style={{marginTop:8, fontSize:12, color:'#666'}}>Current palette: <strong>{palette || 'default'}</strong>{previewing ? ` — previewing ${previewing}` : ''}</div>
        </div>

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

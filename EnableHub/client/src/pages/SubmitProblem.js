import React, { useState, useRef } from 'react'
import * as svc from '../services/communityService'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = ['Hearing','Visual','Mobility','Cognitive','Speech','Neurodivergent']

export default function SubmitProblem(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [severity, setSeverity] = useState('minor')
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState('')
  const [statusMsg, setStatusMsg] = useState('')
  const [listening, setListening] = useState(false)
  const [largeFont, setLargeFont] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const user = (()=>{ try{ return JSON.parse(localStorage.getItem('eh_user')) }catch(e){ return null } })()

  // voice-to-text using Web Speech API (best-effort)
  let recognition = null
  if(typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)){
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.onresult = (e) => {
      const t = Array.from(e.results).map(r=>r[0].transcript).join(' ')
      setDescription(prev => (prev ? prev + ' ' : '') + t)
      setListening(false)
    }
    recognition.onerror = (e) => { setError('Voice recognition error'); setListening(false) }
    recognition.onend = ()=> setListening(false)
  }

  const toggleListen = () => {
    if(!recognition) return setError('Voice recognition not supported in this browser.')
    if(listening){ recognition.stop(); setListening(false); }
    else{ try{ recognition.start(); setListening(true); }catch(e){ setError('Could not start voice recognition') } }
  }

  const onFiles = async (files) => {
    const out = []
    for(const f of files){
      try{
        const dataUrl = await new Promise((res, rej)=>{
          const reader = new FileReader()
          reader.onload = ()=>res(reader.result)
          reader.onerror = ()=>rej()
          reader.readAsDataURL(f)
        })
        out.push({ name: f.name, type: f.type, size: f.size, dataUrl })
      }catch(e){ console.warn('file read failed', e) }
    }
    setAttachments(prev=>[...prev, ...out])
  }

  const removeAttachment = (idx)=> setAttachments(prev=>prev.filter((_,i)=>i!==idx))

  const toggleTag = (tag)=> setTags(prev => prev.includes(tag) ? prev.filter(t=>t!==tag) : [...prev, tag])

  const submit = async (e) =>{
    e && e.preventDefault()
    setError(''); setStatusMsg('')
    if(!title || !description) return setError('Please add a title and describe your issue.')

    const payload = {
      title,
      description,
      tags: tags,
      severity,
      attachments,
      type: 'problem',
      author: user ? { email: user.email, name: user.username, role: user.role } : null,
      createdAt: new Date().toISOString()
    }

    try{
      const newItem = svc.addSubmission(payload)
      setStatusMsg('Thanks! Your problem is now visible to contributors. You’ll be notified when someone suggests a solution.')
      // small delay then navigate to showcase or to the new item view
      setTimeout(()=>{ navigate('/showcase') }, 1200)
    }catch(err){ setError('Could not submit — please try again.') }
  }

  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">Describe your challenge — we’ll help you solve it.</h2>
          <p className="hero-lead">Short instructions: write in plain language and include examples like “Captions lag behind audio” or “I need transcripts after sessions”.</p>
        </div>
      </section>

      <form onSubmit={submit} style={{maxWidth:900, margin:'18px auto'}} className={largeFont ? 'large-font-form' : undefined}>
        <div className="card">
          <label style={{display:'block', marginTop:6}}>Title</label>
          <input aria-label="Problem title" placeholder="Short title (e.g., Captions lag behind audio)" style={{width:'100%', padding:8, fontSize: largeFont ? 20 : 14}} value={title} onChange={(e)=>setTitle(e.target.value)} />

          <label style={{display:'block', marginTop:12}}>Describe your issue</label>
          <textarea aria-label="Problem description" placeholder="Explain your issue in simple words (what happened, where, steps to reproduce)..." rows={6} style={{width:'100%', padding:8, fontSize: largeFont ? 18 : 14}} value={description} onChange={(e)=>setDescription(e.target.value)} />

          <div style={{display:'flex', gap:8, marginTop:8, alignItems:'center'}}>
            <button type="button" className="btn" onClick={toggleListen} aria-pressed={listening}>{listening ? 'Stop voice input' : 'Voice-to-text'}</button>
            <button type="button" className="btn btn-secondary" onClick={()=>setLargeFont(v=>!v)} aria-pressed={largeFont}>{largeFont ? 'Normal font' : 'Large font'}</button>
          </div>

          <label style={{display:'block', marginTop:12}}>Attach supporting files (optional)</label>
          <input ref={fileInputRef} type="file" multiple onChange={(e)=>onFiles(e.target.files)} aria-label="Attach files" />
          {attachments.length>0 && (
            <div style={{marginTop:8}}>
              {attachments.map((a,i)=> (
                <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:8, border:'1px solid #eee', marginTop:6}}>
                  <div>
                    <strong>{a.name}</strong>
                    <div style={{fontSize:12, color:'#666'}}>{Math.round(a.size/1024)} KB</div>
                  </div>
                  <div><button type="button" className="btn" onClick={()=>removeAttachment(i)}>Remove</button></div>
                </div>
              ))}
            </div>
          )}

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
            <div>
              <label style={{display:'block'}}>Category</label>
              <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:6}}>
                {CATEGORIES.map(c=> (
                  <label key={c} style={{display:'inline-flex', alignItems:'center', gap:6}}>
                    <input type="checkbox" checked={tags.includes(c)} onChange={()=>toggleTag(c)} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={{display:'block'}}>Severity / Priority</label>
              <div style={{marginTop:6}}>
                <label style={{display:'block'}}><input type="radio" name="sev" checked={severity==='minor'} onChange={()=>setSeverity('minor')} /> Minor inconvenience</label>
                <label style={{display:'block'}}><input type="radio" name="sev" checked={severity==='major'} onChange={()=>setSeverity('major')} /> Major barrier</label>
              </div>
            </div>
          </div>

          {error && <div role="alert" style={{color:'var(--danger, #d9534f)', marginTop:12}}>{error}</div>}
          {statusMsg && <div role="status" style={{color:'var(--success, #2f855a)', marginTop:12}}>{statusMsg}</div>}

          <div style={{display:'flex', justifyContent:'space-between', marginTop:12, alignItems:'center'}}>
            <div style={{color:'#666'}}><small>Need help drafting? Try a short example sentence describing the issue.</small></div>
            <div>
              <button type="button" className="btn" onClick={()=>{ setTitle(''); setDescription(''); setTags([]); setAttachments([]); setSeverity('minor'); setStatusMsg(''); }}>Reset</button>
              <button className="btn btn-primary" style={{marginLeft:8}} onClick={submit}>Submit Problem</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}

import React, { useEffect, useState } from 'react'
import * as svc from '../services/communityService'

export default function Showcase(){
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [rating, setRating] = useState(5)
  const [feedbackText, setFeedbackText] = useState('')

  useEffect(()=>{ setItems(svc.listSubmissions()) }, [])

  const submit = ()=>{
    if(!title || !description) return
    const t = tags.split(',').map(s=>s.trim()).filter(Boolean)
    const newItem = svc.addSubmission({ title, description, url, tags: t })
    setItems(prev=>[newItem, ...prev])
    setTitle(''); setUrl(''); setDescription(''); setTags('')
  }

  const doRate = (id, score)=>{
    svc.addRating(id, score)
    setItems(svc.listSubmissions())
  }

  const doFeedback = (id)=>{
    if(!feedbackText) return
    svc.addFeedback(id, 'User', feedbackText)
    setFeedbackText('')
    setItems(svc.listSubmissions())
  }

  return (
    <div className="page">
      <h2 className="section-title">Community Solutions Showcase</h2>
      <p style={{textAlign:'center', color:'var(--muted)'}}>Share small accessibility tips, CSS snippets, extensions, and hacks. Others can rate and leave feedback.</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:20, marginTop:18}}>
        <div>
          <div className="card">
            <h3>Submit a solution</h3>
            <label style={{display:'block', marginTop:8}}>Title</label>
            <input style={{width:'100%', padding:8}} value={title} onChange={(e)=>setTitle(e.target.value)} />
            <label style={{display:'block', marginTop:8}}>URL (optional)</label>
            <input style={{width:'100%', padding:8}} value={url} onChange={(e)=>setUrl(e.target.value)} />
            <label style={{display:'block', marginTop:8}}>Tags (comma separated)</label>
            <input style={{width:'100%', padding:8}} value={tags} onChange={(e)=>setTags(e.target.value)} />
            <label style={{display:'block', marginTop:8}}>Description</label>
            <textarea style={{width:'100%', padding:8}} rows={6} value={description} onChange={(e)=>setDescription(e.target.value)} />
            <div style={{display:'flex', justifyContent:'flex-end', marginTop:8}}>
              <button className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
          </div>

          <div style={{marginTop:18}}>
            <h3>Gallery</h3>
            <div className="card-grid">
              {items.length===0 && <div className="card">No submissions yet — be the first!</div>}
              {items.map(it=> (
                <div key={it.id} className="problem-card">
                  <h4>{it.title}</h4>
                  <div style={{color:'var(--muted)', marginBottom:8}}>{it.description}</div>
                  {it.url && <a href={it.url} target="_blank" rel="noreferrer">Link</a>}
                  <div style={{marginTop:8, display:'flex', alignItems:'center', gap:8}}>
                    <div style={{display:'flex', gap:6, alignItems:'center'}}>
                      <span style={{fontSize:13, color:'var(--muted)'}}>Rating:</span>
                      <strong>{svc.averageRating(it) || '—'}</strong>
                    </div>
                    <div style={{marginLeft:'auto', display:'flex', gap:6}}>
                      {[1,2,3,4,5].map(s=> (
                        <button key={s} className="btn" onClick={()=>doRate(it.id, s)} aria-label={`Rate ${s} stars`}>{s}★</button>
                      ))}
                    </div>
                  </div>

                  <div style={{marginTop:8}}>
                    <div style={{fontSize:13, color:'var(--muted)'}}>Feedback</div>
                    <textarea rows={2} style={{width:'100%', padding:8, marginTop:6}} value={feedbackText} onChange={(e)=>setFeedbackText(e.target.value)} placeholder="Leave feedback for this solution" />
                    <div style={{display:'flex', justifyContent:'flex-end', marginTop:6}}>
                      <button className="btn" onClick={()=>doFeedback(it.id)}>Send</button>
                    </div>
                    {it.feedback && it.feedback.length>0 && (
                      <div style={{marginTop:8}}>
                        <div style={{fontSize:13, color:'var(--muted)'}}>Recent feedback</div>
                        <ul>
                          {it.feedback.slice(0,3).map((f,idx)=>(<li key={idx}><strong>{f.author}:</strong> {f.text}</li>))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3>How to write a good solution</h3>
            <ul>
              <li>Be specific and actionable (CSS snippet or exact extension name)</li>
              <li>Include links where users can find the tool</li>
              <li>Short examples are best</li>
              <li>Tag with related categories like <code>CSS</code>, <code>browser-extension</code>, <code>dyslexia</code></li>
            </ul>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h3>Community guidelines</h3>
            <ul>
              <li>Be respectful</li>
              <li>No malicious code</li>
              <li>Prefer open-source or well-known tools</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

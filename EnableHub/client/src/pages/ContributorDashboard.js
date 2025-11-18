import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import * as svc from '../services/communityService'

function ProblemCard({p, onOpen}){
  return (
    <article className="card" style={{padding:12}}>
      <h4>{p.title}</h4>
      <div style={{color:'var(--muted)'}}>{p.description}</div>
      <div style={{marginTop:8, fontSize:13, color:'#666'}}>Context: {p.learnerContext || '—'}</div>
      <div style={{marginTop:8, fontSize:13, color:'#666'}}>Status: {p.status}</div>
      <div style={{marginTop:8, display:'flex', gap:8}}>
        <button className="btn btn-primary" onClick={()=>onOpen(p)}>Open</button>
        <Link to={`/showcase/${p.id}`} className="btn">View</Link>
      </div>
    </article>
  )
}

export default function ContributorDashboard(){
  const [user, setUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('eh_user')) || { username: 'Contributor', email: '' } }catch(e){ return { username: 'Contributor', email: '' } }
  })

  const [problems, setProblems] = useState([])
  const [category, setCategory] = useState('')
  const [urgency, setUrgency] = useState('')
  const [selected, setSelected] = useState(null)
  const [draft, setDraft] = useState('')
  const [attachments, setAttachments] = useState([])
  const [badges, setBadges] = useState([])

  useEffect(()=>{
    loadProblems()
    setBadges(svc.getBadges(user.email || 'anon'))
  }, [])

  function loadProblems(){
    const all = svc.listSubmissions()
    const list = all.filter(i=>i.type==='problem')
    setProblems(list)
  }

  const categories = useMemo(()=>{
    const set = new Set()
    problems.forEach(p=> set.add(p.category || 'General'))
    return Array.from(set)
  }, [problems])

  function applyFilters(){
    const f = {}
    if(category) f.category = category
    if(urgency) f.urgency = urgency
    setProblems(svc.listSubmissions(f))
  }

  function openProblem(p){
    setSelected(p)
    setDraft('')
    setAttachments([])
  }

  function onAttach(e){
    const files = Array.from(e.target.files || [])
    const readers = files.map(f=> new Promise(res => {
      const r = new FileReader()
      r.onload = ()=> res({ name: f.name, data: r.result })
      r.readAsDataURL(f)
    }))
    Promise.all(readers).then(list=> setAttachments(prev => prev.concat(list)))
  }

  function submitSolution(){
    if(!selected) return
    const sol = svc.addSolution(selected.id, { authorEmail: user.email, content: draft, attachments })
    // award first-solution badge if this is user's first solution
    const userSolutions = problems.reduce((acc,p)=> acc + (p.solutions ? p.solutions.filter(s=>s.authorEmail===user.email).length : 0), 0)
    if(userSolutions === 0) svc.awardBadge(user.email, 'First Solution')
    // award champion badge after 5 solutions
    const total = userSolutions + 1
    if(total >= 5) svc.awardBadge(user.email, 'Accessibility Champion')
    setBadges(svc.getBadges(user.email))
    loadProblems()
    setSelected(null)
    setDraft('')
    setAttachments([])
  }

  function submitComment(solutionId, text){
    if(!selected) return
    svc.addComment(selected.id, solutionId, { authorEmail: user.email, text })
    loadProblems()
  }

  function vote(solutionId, up=true){
    if(!selected) return
    svc.voteSolution(selected.id, solutionId, up)
    loadProblems()
  }

  function markHelpfulAction(solutionId){
    if(!selected) return
    svc.markHelpful(selected.id, solutionId, user.email)
    loadProblems()
  }

  // impact: number of learners helped (unique helpfulByLearners across their solutions)
  const impactCount = useMemo(()=>{
    const allSolutions = problems.flatMap(p => (p.solutions||[]).filter(s => s.authorEmail === user.email))
    const learners = new Set()
    allSolutions.forEach(s => (s.helpfulByLearners||[]).forEach(l => learners.add(l)))
    return learners.size
  }, [problems, user])

  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">You’re joining a community of problem-solvers.</h2>
          <p className="hero-lead">Let’s make tech more inclusive together.</p>
          <div style={{marginTop:8}}><strong>Welcome, {user.username || user.email}</strong></div>
        </div>
      </section>

      <div style={{maxWidth:1100, margin:'18px auto', display:'grid', gap:16}}>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
          <div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <label>Category:</label>
              <select value={category} onChange={e=>setCategory(e.target.value)}>
                <option value="">All</option>
                {categories.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
              <label>Urgency:</label>
              <select value={urgency} onChange={e=>setUrgency(e.target.value)}>
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
              <button className="btn" onClick={applyFilters}>Apply</button>
            </div>

            <h3 style={{marginTop:12}}>Open Problems</h3>
            <div style={{display:'grid', gap:10}}>
              {problems.length===0 && <div className="card">No open problems yet — check back or invite learners to submit.</div>}
              {problems.map(p => <ProblemCard key={p.id} p={p} onOpen={openProblem} />)}
            </div>

            {selected && (
              <div style={{marginTop:16}} className="card">
                <h4>Suggest Solution — {selected.title}</h4>
                <div style={{fontSize:13, color:'#444', marginBottom:8}}>{selected.description}</div>
                <div style={{background:'#f9f9f9', padding:10, borderRadius:6}}>
                  <strong>Accessibility hints:</strong>
                  <ul>
                    <li>Keep language simple and direct.</li>
                    <li>Explain why the solution works for assistive tech.</li>
                    <li>Provide code with comments and clear examples.</li>
                  </ul>
                </div>
                <div style={{marginTop:8}}>
                  <textarea aria-label="Solution draft" value={draft} onChange={e=>setDraft(e.target.value)} style={{width:'100%', minHeight:140}} placeholder="Explain your solution, steps, and rationale..." />
                </div>
                <div style={{marginTop:8}}>
                  <label className="btn">Attach files<input type="file" onChange={onAttach} style={{display:'none'}} multiple/></label>
                  <span style={{marginLeft:8}}>{attachments.length} attachment(s)</span>
                </div>
                <div style={{marginTop:8}}>
                  <button className="btn btn-primary" onClick={submitSolution}>Suggest Solution</button>
                  <button className="btn" onClick={()=>setSelected(null)} style={{marginLeft:8}}>Cancel</button>
                </div>

                <div style={{marginTop:12}}>
                  <h5>Existing Solutions</h5>
                  {(selected.solutions||[]).map(sol=> (
                    <div key={sol.id} className="card" style={{padding:10, marginTop:8}}>
                      <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div><strong>{sol.authorEmail}</strong> <span style={{color:'#666', fontSize:12}}> — {new Date(sol.createdAt).toLocaleString()}</span></div>
                        <div style={{display:'flex', gap:8}}>
                          <button className="btn" onClick={()=>vote(sol.id, true)}>▲ {sol.upvotes||0}</button>
                          <button className="btn" onClick={()=>vote(sol.id, false)}>▼ {sol.downvotes||0}</button>
                          <button className="btn" onClick={()=>markHelpfulAction(sol.id)}>Mark helpful</button>
                        </div>
                      </div>
                      <div style={{marginTop:8}}>{sol.content}</div>
                      <div style={{marginTop:8}}>
                        <strong>Comments</strong>
                        {(sol.comments||[]).map(c=> (
                          <div key={c.id} style={{marginTop:6, padding:6, borderLeft:'2px solid #eee'}}>
                            <div style={{fontSize:13}}><strong>{c.authorEmail}</strong> <span style={{color:'#666', fontSize:12}}>{new Date(c.createdAt).toLocaleString()}</span></div>
                            <div style={{marginTop:4}}>{c.text}</div>
                          </div>
                        ))}
                        <div style={{marginTop:8}}>
                          <CommentBox onSubmit={(txt)=>submitComment(sol.id, txt)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="card">
              <h4>Impact</h4>
              <p style={{margin:0}}>You’ve helped <strong>{impactCount}</strong> learner(s).</p>
              <div style={{marginTop:8}}>
                <strong>Badges</strong>
                <div style={{marginTop:8}}>{badges.length===0 ? <div>No badges yet</div> : badges.map(b=> <div key={b} className="badge">{b}</div>)}</div>
              </div>
            </div>

            <div className="card" style={{marginTop:12}}>
              <h4>Quick links</h4>
              <div style={{display:'grid', gap:8}}>
                <Link to="/showcase" className="btn">Community Showcase</Link>
                <Link to="/submit" className="btn">Invite a learner to submit</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function CommentBox({onSubmit}){
  const [txt, setTxt] = useState('')
  return (
    <div style={{display:'flex', gap:8, marginTop:6}}>
      <input aria-label="Comment" value={txt} onChange={e=>setTxt(e.target.value)} style={{flex:1}} />
      <button className="btn" onClick={()=>{ if(txt.trim()){ onSubmit(txt); setTxt('') } }}>Comment</button>
    </div>
  )
}

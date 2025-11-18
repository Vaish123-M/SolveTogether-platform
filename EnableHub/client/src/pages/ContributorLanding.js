import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as svc from '../services/communityService'

export default function ContributorLanding(){
  const [problems, setProblems] = useState([])

  useEffect(()=>{
    const all = svc.listSubmissions()
    // show items marked as type 'problem' or fallback to all
    const list = all.filter(i=>i.type==='problem')
    setProblems(list.length ? list : all)
  },[])

  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">You’re joining a community of problem-solvers.</h2>
          <p className="hero-lead">Let’s make tech more inclusive together — find open problems, suggest accessible solutions, and collaborate with peers.</p>
        </div>
      </section>

      <div style={{maxWidth:1000, margin:'18px auto', display:'grid', gap:16}}>
        <div className="card">
          <h3>Contributor quick start</h3>
          <ul>
            <li>Browse open problems listed below.</li>
            <li>Filter by category and urgency (coming soon).</li>
            <li>Open a problem to draft and suggest a solution.</li>
          </ul>
          <div style={{marginTop:12}}>
            <Link to="/contributor" className="btn btn-primary">Open Contributor Dashboard</Link>
            <Link to="/signup" className="btn" style={{marginLeft:8}}>Create account</Link>
          </div>
        </div>

        <div>
          <h3>Open problems</h3>
          {problems.length===0 && <div className="card">No open problems yet — check back or invite learners to submit.</div>}
          <div className="card-grid" style={{marginTop:12}}>
            {problems.map(p=> (
              <article className="problem-card" key={p.id}>
                <h4>{p.title}</h4>
                <div style={{color:'var(--muted)'}}>{p.description}</div>
                <div style={{marginTop:8, fontSize:13, color:'#666'}}>Category: {p.tags && p.tags.join(', ')}</div>
                <div style={{display:'flex', gap:8, marginTop:8}}>
                  <Link to="/contributor" className="btn btn-primary">Suggest Solution</Link>
                  <button className="btn">Discuss</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

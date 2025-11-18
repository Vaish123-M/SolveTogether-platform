import React from 'react'
import { Link } from 'react-router-dom'

const SAMPLE = [
  { title: 'Reachable actions', quote: 'Buttons are too small or too close together for assistive devices.' },
  { title: 'Drag-and-drop fallback', quote: 'I can’t use drag-and-drop reliably; need keyboard alternatives.' },
]

export default function Mobility(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🦽 Mobility Support Space</h2>
          <p className="hero-lead">Keyboard-first patterns, reachable controls, and alternatives to gestures.</p>
        </div>
        <div className="page-illustration theme-mobility" aria-hidden>🦽</div>
      </section>

      <div className="filters">
        <div className="tag">🔧 Needs Tech Help</div>
        <div className="tag">🎨 Design Challenge</div>
      </div>

      <h3>Sample problems</h3>
      <div className="card-grid">
        {SAMPLE.map((p) => (
          <article className="problem-card" key={p.title}>
            <h4>{p.title}</h4>
            <p>“{p.quote}”</p>
            <div className="card-actions">
              <button className="btn btn-primary">Suggest a solution</button>
              <button className="btn btn-secondary">Save</button>
            </div>
          </article>
        ))}
      </div>

      <div className="page-cta">
        <div>
          <strong>Your ideas can change lives.</strong>
          <div style={{color:'var(--muted)'}}>Submit mobility problems or join the contributor community.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <Link to="/submit" className="btn btn-secondary">Submit a problem</Link>
          <Link to="/contribute" className="btn btn-primary">Join as contributor</Link>
        </div>
      </div>
    </main>
  )
}

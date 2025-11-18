import React from 'react'
import { Link } from 'react-router-dom'

const SAMPLE = [
  { title: 'Simplify onboarding', quote: 'I forget steps in the signup flow — make it simpler.' },
  { title: 'Step-by-step tasks', quote: 'I need smaller bite-sized instructions for multi-step tasks.' },
  { title: 'Memory aid suggestions', quote: 'Quick reminders would help me return to progress.' },
]

export default function Cognitive(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧠 Welcome to the Cognitive Support Space</h2>
          <p className="hero-lead">Short guides, gentle workflows, and example problems to make learning predictable and calm.</p>
        </div>
        <div className="page-illustration theme-cognitive" aria-hidden="true">🧠</div>
      </section>

      <div className="filters" role="toolbar" aria-label="Filter problems">
        <div className="tag">🔧 Needs Tech Help</div>
        <div className="tag">💬 Communication</div>
        <div className="tag">⏱️ Urgent</div>
      </div>

      <h3 style={{marginTop:6}}>Sample problems</h3>
      <div className="card-grid" aria-live="polite">
        {SAMPLE.map((p) => (
          <article key={p.title} className="problem-card">
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
          <div style={{color:'var(--muted)'}}>Start by submitting a problem or join as a contributor.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <Link to="/submit" className="btn btn-secondary">Submit a problem</Link>
          <Link to="/contribute" className="btn btn-primary">Join as contributor</Link>
        </div>
      </div>
    </main>
  )
}

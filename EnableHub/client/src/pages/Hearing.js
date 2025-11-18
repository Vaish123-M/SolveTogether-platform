import React from 'react'
import { Link } from 'react-router-dom'

const SAMPLE = [
  { title: 'Caption sync', quote: 'Captions often lag the audio — sync them.' },
  { title: 'Transcript export', quote: 'I want to download transcripts after sessions.' },
]

export default function Hearing(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🦻 Hearing Support Space</h2>
          <p className="hero-lead">Captions, better notifications, and clear alternatives for audio-first content.</p>
        </div>
        <div className="page-illustration theme-hearing" aria-hidden>🦻</div>
      </section>

      <div className="filters">
        <div className="tag">💬 Communication Barrier</div>
        <div className="tag">🔧 Needs Tech Help</div>
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
          <div style={{color:'var(--muted)'}}>Share an issue or start helping today.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <Link to="/submit" className="btn btn-secondary">Submit a problem</Link>
          <Link to="/contribute" className="btn btn-primary">Join as contributor</Link>
        </div>
      </div>
    </main>
  )
}

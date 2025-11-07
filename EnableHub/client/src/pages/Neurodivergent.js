import React from 'react'

const SAMPLE = [
  { title: 'Reduced motion mode', quote: 'Animations make me uncomfortable — provide a calm mode.' },
  { title: 'Simpler layouts', quote: 'I need less busy screens to focus.' },
]

export default function Neurodivergent(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧩 Neurodivergent Support Space</h2>
          <p className="hero-lead">Options for reduced motion, simplified layouts, and predictable flows.</p>
        </div>
        <div className="page-illustration theme-neuro" aria-hidden>🧩</div>
      </section>

      <div className="filters">
        <div className="tag">🧪 Prototype Ready</div>
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
          <div style={{color:'var(--muted)'}}>Share a neurodivergent-friendly problem or join contributors.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-secondary">Submit a problem</button>
          <button className="btn btn-primary">Join as contributor</button>
        </div>
      </div>
    </main>
  )
}

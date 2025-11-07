import React from 'react'

const SAMPLE = [
  { title: 'High-contrast mode', quote: 'I need stronger contrast for text and UI elements.' },
  { title: 'Large text scaling', quote: 'Fonts should scale without breaking layout.' },
]

export default function Visual(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🦯 Visual Accessibility Space</h2>
          <p className="hero-lead">High-contrast modes, scalable fonts, and clear focus states for sight-impaired users.</p>
        </div>
        <div className="page-illustration theme-visual" aria-hidden>🦯</div>
      </section>

      <div className="filters">
        <div className="tag">🔧 Needs Tech Help</div>
        <div className="tag">🧪 Prototype Ready</div>
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
          <div style={{color:'var(--muted)'}}>Submit a visual accessibility issue or join contributors.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-secondary">Submit a problem</button>
          <button className="btn btn-primary">Join as contributor</button>
        </div>
      </div>
    </main>
  )
}

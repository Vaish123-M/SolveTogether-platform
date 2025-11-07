import React from 'react'

const SAMPLE = [
  { title: 'Voice command discoverability', quote: 'I don’t know which commands are available.' },
  { title: 'Alternate controls', quote: 'Provide easier alternatives if voice is unreliable.' },
]

export default function Speech(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🗣️ Speech Support Space</h2>
          <p className="hero-lead">Voice-friendly controls with clear fallbacks for non-verbal interaction.</p>
        </div>
        <div className="page-illustration theme-speech" aria-hidden>🗣️</div>
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
          <div style={{color:'var(--muted)'}}>Share a speech-related problem or join contributors.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-secondary">Submit a problem</button>
          <button className="btn btn-primary">Join as contributor</button>
        </div>
      </div>
    </main>
  )
}

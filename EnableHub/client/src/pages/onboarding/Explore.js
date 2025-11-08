import React from 'react'

export default function Explore(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧑‍🎨 Explore</h2>
          <p className="hero-lead">Browse problems, learn by example, and find areas where you can contribute or learn.</p>
        </div>
        <div className="page-illustration theme-neuro" aria-hidden>🧑‍🎨</div>
      </section>

      <div style={{maxWidth:800, margin:'18px auto'}}>
        <p>Quick start: explore recent problems and featured contributors.</p>
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn btn-primary">Start exploring</button>
          <button className="btn btn-secondary">See contributors</button>
        </div>
      </div>
    </main>
  )
}

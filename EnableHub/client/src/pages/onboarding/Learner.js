import React from 'react'

export default function Learner(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧑‍🦽 Welcome, learner</h2>
          <p className="hero-lead">Tell us a bit about your goals and the types of help you need. We'll match you with resources and contributors.</p>
        </div>
        <div className="page-illustration theme-mobility" aria-hidden>🧑‍🦽</div>
      </section>

      <div style={{maxWidth:800, margin:'18px auto'}}>
        <p>Quick start: choose one area to begin — Cognitive, Hearing, Visual, Mobility, Speech, or Neurodivergent support.</p>
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn btn-primary">Start onboarding</button>
          <button className="btn btn-secondary">Maybe later</button>
        </div>
      </div>
    </main>
  )
}

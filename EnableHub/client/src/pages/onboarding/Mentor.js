import React from 'react'

export default function Mentor(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧑‍🏫 Welcome, mentor</h2>
          <p className="hero-lead">Create workshops, mentor learners, and help scale community knowledge with structured sessions.</p>
        </div>
        <div className="page-illustration theme-cognitive" aria-hidden>🧑‍🏫</div>
      </section>

      <div style={{maxWidth:800, margin:'18px auto'}}>
        <p>Quick start: create your first session or join a mentorship cohort.</p>
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn btn-primary">Create session</button>
          <button className="btn btn-secondary">Find mentees</button>
        </div>
      </div>
    </main>
  )
}

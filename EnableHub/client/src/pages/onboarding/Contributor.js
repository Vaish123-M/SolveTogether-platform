import React from 'react'

export default function Contributor(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧑‍💻 Welcome, contributor</h2>
          <p className="hero-lead">Share your skills, find problems that match your expertise, and collaborate with learners.</p>
        </div>
        <div className="page-illustration theme-cognitive" aria-hidden>🧑‍💻</div>
      </section>

      <div style={{maxWidth:800, margin:'18px auto'}}>
        <p>Quick start: pick topics you can help with and set your availability.</p>
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn btn-primary">Create profile</button>
          <button className="btn btn-secondary">Browse problems</button>
        </div>
      </div>
    </main>
  )
}

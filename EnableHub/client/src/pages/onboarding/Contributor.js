import React from 'react'

export default function Contributor(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧑‍💻 Hey there — contributor</h2>
          <p className="hero-lead">Thanks for lending your skills. Share solutions, review learner work, and pick problems that light you up.</p>
        </div>
        <div className="page-illustration theme-cognitive" aria-hidden>🧑‍💻</div>
      </section>

      <div style={{maxWidth:800, margin:'18px auto'}}>
        <p>Quick start — tell us what you enjoy helping with and when you’re available. We’ll surface matching problems and learners.</p>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginTop:12}}>
          <div className="problem-card" style={{padding:12}}>
            <h4>🔎 Matched problems</h4>
            <p style={{margin:0}}>Problems that match your skills and availability.</p>
          </div>
          <div className="problem-card" style={{padding:12}}>
            <h4>🗓️ Availability</h4>
            <p style={{margin:0}}>Set quick blocks or recurring times you can help.</p>
          </div>
          <div className="problem-card" style={{padding:12}}>
            <h4>💬 Messages</h4>
            <p style={{margin:0}}>Connect directly with learners and mentors.</p>
          </div>
        </div>

        <div style={{display:'flex', gap:8, marginTop:16}}>
          <button className="btn btn-primary" onClick={()=>window.location.href='/login'}>Create profile ✨</button>
          <button className="btn btn-secondary">Browse problems 🔎</button>
        </div>

        <div style={{marginTop:12, color:'#744210'}} aria-live="polite">Your help matters — thank you for being here. 🙏</div>
      </div>
    </main>
  )
}

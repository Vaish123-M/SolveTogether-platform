import React from 'react'

export default function Mentor(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧑‍🏫 Welcome — mentor</h2>
          <p className="hero-lead">Thanks for stepping up. Your guidance helps learners grow — create thoughtful workshops, host sessions, and shape a supportive learning journey.</p>
        </div>
        <div className="page-illustration theme-cognitive" aria-hidden>🧑‍🏫</div>
      </section>

      <div style={{maxWidth:800, margin:'18px auto'}}>
        <p>Quick start — build your first session or browse mentee requests. We’ll help you run engaging, accessible workshops.</p>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginTop:12}}>
          <div className="problem-card" style={{padding:12}}>
            <h4>🗓️ Upcoming sessions</h4>
            <p style={{margin:0}}>Manage sessions and attendee lists at a glance.</p>
          </div>
          <div className="problem-card" style={{padding:12}}>
            <h4>🎯 Mentee requests</h4>
            <p style={{margin:0}}>See learners who need help and match with ease.</p>
          </div>
          <div className="problem-card" style={{padding:12}}>
            <h4>📈 Impact</h4>
            <p style={{margin:0}}>Track feedback and outcomes from your workshops.</p>
          </div>
        </div>

        <div style={{display:'flex', gap:8, marginTop:16}}>
          <button className="btn btn-primary" onClick={()=>window.location.href='/login'}>Create workshop ✍️</button>
          <button className="btn btn-secondary">Find mentees 🤝</button>
        </div>

        <div style={{marginTop:12, color:'#2b6cb0'}} aria-live="polite">Let’s solve this together — your experience matters. 🌟</div>
      </div>
    </main>
  )
}

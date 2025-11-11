import React from 'react'

export default function Learner(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧑‍🦽 Hi there — welcome, learner</h2>
          <p className="hero-lead">You’re doing great — we’re here to help. Tell us a little about your goals and preferred ways of learning, and we’ll tailor resources and matches just for you.</p>
        </div>
        <div className="page-illustration theme-mobility" aria-hidden>🧑‍🦽</div>
      </section>

      <div style={{maxWidth:800, margin:'18px auto'}}>
        <p>Quick start — pick one area that feels most important today. We’ll build a gentle path and connect you with helpful contributors.</p>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginTop:12}}>
          <div className="problem-card" style={{padding:12}}>
            <h4>✨ Recommended for you</h4>
            <p style={{margin:0}}>Curated resources and short lessons based on your goals.</p>
          </div>
          <div className="problem-card" style={{padding:12}}>
            <h4>🤝 Matched contributors</h4>
            <p style={{margin:0}}>People ready to help — quick chats or scheduled sessions.</p>
          </div>
          <div className="problem-card" style={{padding:12}}>
            <h4>🗓️ Upcoming</h4>
            <p style={{margin:0}}>Your upcoming sessions and reminders, all in one place.</p>
          </div>
        </div>

        <div style={{display:'flex', gap:8, marginTop:16}}>
          <button className="btn btn-primary">Let’s get started — set goals 🎯</button>
          <button className="btn btn-secondary">I’ll explore first 👀</button>
        </div>

        <div style={{marginTop:12, color:'#2f855a'}} aria-live="polite">You’re doing great — small steps win big. 💪</div>
      </div>
    </main>
  )
}

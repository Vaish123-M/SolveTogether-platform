import React from 'react'

export default function Explore(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">🧑‍🎨 Explore and discover</h2>
          <p className="hero-lead">Curious? Great — wander around curated problems, learn from examples, and find ways to jump in when you’re ready.</p>
        </div>
        <div className="page-illustration theme-neuro" aria-hidden>🧑‍🎨</div>
      </section>

      <div style={{maxWidth:800, margin:'18px auto'}}>
        <p>Quick start — try browsing trending problems, or peek at featured contributors and learning paths.</p>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginTop:12}}>
          <div className="problem-card" style={{padding:12}}>
            <h4>🔥 Trending problems</h4>
            <p style={{margin:0}}>See what's getting traction right now.</p>
          </div>
          <div className="problem-card" style={{padding:12}}>
            <h4>🏆 Featured contributors</h4>
            <p style={{margin:0}}>People who are actively helping the community.</p>
          </div>
          <div className="problem-card" style={{padding:12}}>
            <h4>🛣️ Learning paths</h4>
            <p style={{margin:0}}>Curated steps to grow skills in accessible chunks.</p>
          </div>
        </div>

        <div style={{display:'flex', gap:8, marginTop:16}}>
          <button className="btn btn-primary">Start exploring 🔍</button>
          <button className="btn btn-secondary">See contributors ✨</button>
        </div>

        <div style={{marginTop:12, color:'#805ad5'}} aria-live="polite">Nice curiosity — keep exploring, you never know what you’ll discover. 🌱</div>
      </div>
    </main>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

function ResourceCard({title, desc, to}){
  return (
    <div className="problem-card" style={{padding:12}}>
      <h4>{title}</h4>
      <p style={{margin:0}}>{desc}</p>
      {to && <div style={{marginTop:8}}><Link to={to} className="btn btn-secondary">Explore</Link></div>}
    </div>
  )
}

export default function LearnerDashboard(){
  let user = { username: 'Learner' }
  try{ user = JSON.parse(localStorage.getItem('eh_user')) || user }catch(e){}

  // simple mock data — in a full app this would come from an API
  const contributors = [
    { name: 'Alex Martin', role: 'Contributor', availability: 'Today · 3:00 PM' },
    { name: 'Samira K.', role: 'Mentor', availability: 'Tomorrow · 10:00 AM' }
  ]

  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">👩‍🎓 Welcome back, {user.username} — here’s your learning path.</h2>
          <p className="hero-lead">Quick access to tailored resources, upcoming sessions, and suggested helpers.</p>
        </div>
      </section>

      <div style={{maxWidth:1000, margin:'18px auto', display:'grid', gap:16}}>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
          <div>
            <h3>Personalized Dashboard</h3>
            <p>Curated resources based on your goals.</p>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginTop:12}}>
              <ResourceCard title="Cognitive Support" desc="Short lessons and practice tasks." to="/cognitive" />
              <ResourceCard title="Hearing Support" desc="Captions, transcripts, and tips." to="/hearing" />
              <ResourceCard title="Visual Support" desc="Contrast, magnification and guides." to="/visual" />
            </div>

            <h3 style={{marginTop:18}}>Upcoming Sessions</h3>
            <div className="card" style={{padding:12}}>
              <p style={{margin:0}}>No sessions scheduled — <Link to="/showcase">Find a contributor</Link> or schedule one-on-one chats.</p>
              <div style={{marginTop:8}}><small>Calendar view placeholder</small></div>
            </div>

            <h3 style={{marginTop:18}}>Progress Tracker</h3>
            <div className="card" style={{padding:12}}>
              <p style={{margin:0}}>You’ve completed 2 of 8 steps in your path. Keep going — small steps win big.</p>
              <div style={{height:8, background:'#eee', marginTop:8, borderRadius:8}}>
                <div style={{width:'25%', height:'100%', background:'var(--accent, #4f46e5)', borderRadius:8}} />
              </div>
            </div>
          </div>

          <aside>
            <h4>Matched Contributors</h4>
            <div style={{display:'grid', gap:8}}>
              {contributors.map((c,i)=> (
                <div key={i} className="card" style={{padding:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <strong>{c.name}</strong>
                    <div style={{fontSize:12, color:'#666'}}>{c.role} · {c.availability}</div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Chat</button>
                  </div>
                </div>
              ))}
            </div>

            <h4 style={{marginTop:12}}>Accessibility Controls</h4>
            <div className="card" style={{padding:8}}>
              <p style={{margin:0}}>Adjust text size, contrast, and text-to-speech from the accessibility bar in the top-right.</p>
              <div style={{marginTop:8}}><Link to="#" className="btn btn-secondary">Open accessibility settings</Link></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

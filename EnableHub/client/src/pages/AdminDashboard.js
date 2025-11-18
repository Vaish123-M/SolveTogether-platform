import React from 'react'
import { Link } from 'react-router-dom'

function Stat({label, value}){
  return (
    <div className="card" style={{padding:12, textAlign:'center'}}>
      <div style={{fontSize:20, fontWeight:700}}>{value}</div>
      <div style={{fontSize:13, color:'#666'}}>{label}</div>
    </div>
  )
}

export default function AdminDashboard(){
  let user = { username: 'Admin' }
  try{ user = JSON.parse(localStorage.getItem('eh_user')) || user }catch(e){}

  // Mock stats and reports — replace with real API calls in production
  const users = JSON.parse(localStorage.getItem('eh_users') || '[]')
  const activeLearners = users.filter(u => u.role === 'learner').length
  const activeContributors = users.filter(u => u.role === 'contributor').length
  const sessions = JSON.parse(localStorage.getItem('eh_community_showcase') || '[]').length

  // simple a11y heuristic examples
  const reports = [
    { id: 1, issue: 'Missing header landmark', count: 3 },
    { id: 2, issue: 'Interactive elements missing accessible name', count: 8 }
  ]

  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">Platform Overview</h2>
          <p className="hero-lead">Welcome, {user.username}. Monitor platform activity, manage users, and review accessibility reports.</p>
        </div>
      </section>

      <div style={{maxWidth:1100, margin:'18px auto', display:'grid', gap:16}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
          <Stat label="Active Learners" value={activeLearners} />
          <Stat label="Active Contributors" value={activeContributors} />
          <Stat label="Sessions / Submissions" value={sessions} />
        </div>

        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
          <div>
            <h3>Accessibility Compliance Reports</h3>
            <div style={{display:'grid', gap:8}}>
              {reports.map(r => (
                <div key={r.id} className="card" style={{padding:12}}>
                  <strong>{r.issue}</strong>
                  <div style={{fontSize:13, color:'#666'}}>{r.count} occurrences</div>
                  <div style={{marginTop:8}}><button className="btn btn-secondary">View details</button></div>
                </div>
              ))}
            </div>

            <h3 style={{marginTop:18}}>Content Moderation</h3>
            <div className="card" style={{padding:12}}>
              <p style={{margin:0}}>Review submitted problems and solutions for inclusivity and safety.</p>
              <div style={{marginTop:8}}><Link to="/showcase" className="btn btn-primary">Open submissions</Link></div>
            </div>
          </div>

          <aside>
            <h4>User Management</h4>
            <div className="card" style={{padding:8}}>
              <p style={{margin:0}}>Approve accounts, assign roles, and monitor activity.</p>
              <div style={{marginTop:8}}>
                <button className="btn btn-primary">Manage users</button>
              </div>
            </div>

            <h4 style={{marginTop:12}}>Event Scheduling</h4>
            <div className="card" style={{padding:8}}>
              <p style={{margin:0}}>Plan hackathons, workshops, and community events.</p>
              <div style={{marginTop:8}}><button className="btn btn-secondary">Create event</button></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

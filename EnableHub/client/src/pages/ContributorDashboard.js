import React from 'react'
import { Link } from 'react-router-dom'

function LearnerCard({name, needs}){
  return (
    <div className="card" style={{padding:12}}>
      <strong>{name}</strong>
      <div style={{fontSize:13, color:'#444'}}>{needs}</div>
      <div style={{marginTop:8}}><button className="btn btn-primary">Open</button></div>
    </div>
  )
}

export default function ContributorDashboard(){
  // read current user for display
  let user = { username: 'Contributor' }
  try{ user = JSON.parse(localStorage.getItem('eh_user')) || user }catch(e){}

  // mock data for learners and pending requests
  const learners = [
    { name: 'Jamie P.', needs: 'Cognitive support — short lessons' },
    { name: 'Ravi S.', needs: 'Visual support — high contrast guidance' }
  ]

  const pending = [
    { title: 'Help with reading exercises', learner: 'Aisha', submitted: '2 days ago' },
    { title: 'Improve voice clarity', learner: 'Ben', submitted: '5 days ago' }
  ]

  const feedback = [
    { learner: 'Aisha', rating: 'helpful', comment: 'Great, short steps worked well.' },
    { learner: 'Ben', rating: 'needs improvement', comment: 'Would like more examples.' }
  ]

  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">Contribution Hub — welcome, {user.username}</h2>
          <p className="hero-lead">View matched learners, respond to requests, draft solutions, and track impact.</p>
        </div>
      </section>

      <div style={{maxWidth:1000, margin:'18px auto', display:'grid', gap:16}}>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
          <div>
            <h3>Pending Requests</h3>
            <div style={{display:'grid', gap:8}}>
              {pending.map((p,i)=> (
                <div key={i} className="card" style={{padding:12}}>
                  <strong>{p.title}</strong>
                  <div style={{fontSize:13, color:'#666'}}>From {p.learner} — {p.submitted}</div>
                  <div style={{marginTop:8, display:'flex', gap:8}}>
                    <button className="btn btn-primary">Open Workspace</button>
                    <button className="btn btn-secondary">Decline</button>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{marginTop:18}}>Solution Workspace</h3>
            <div className="card" style={{padding:12}}>
              <p style={{margin:0}}>Draft and test accessible solutions here. (Editor placeholder)</p>
              <div style={{marginTop:8}}>
                <textarea placeholder="Draft your solution notes..." style={{width:'100%', minHeight:120}} />
                <div style={{marginTop:8}}><button className="btn btn-primary">Submit Solution</button></div>
              </div>
            </div>
          </div>

          <aside>
            <h4>Learners Matched To You</h4>
            <div style={{display:'grid', gap:8}}>
              {learners.map((l,i)=> <LearnerCard key={i} name={l.name} needs={l.needs} />)}
            </div>

            <h4 style={{marginTop:12}}>Impact Metrics</h4>
            <div className="card" style={{padding:8}}>
              <p style={{margin:0}}>Feedback summary: {feedback.filter(f=>f.rating==='helpful').length} helpful, {feedback.filter(f=>f.rating!=='helpful').length} needs improvement.</p>
              <div style={{marginTop:8}}><Link to="#" className="btn btn-secondary">View full feedback</Link></div>
            </div>

            <h4 style={{marginTop:12}}>Community Recognition</h4>
            <div className="card" style={{padding:8}}>
              <p style={{margin:0}}>Earn badges and credits for accepted solutions. <Link to="#">View badges</Link></p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

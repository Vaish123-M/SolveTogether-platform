import React from 'react'
import { Link } from 'react-router-dom'

export default function SubmitLanding(){
  return (
    <main className="page">
      <section className="page-hero">
        <div className="hero-text">
          <h2 className="hero-title">Need help? We’re here to listen.</h2>
          <p className="hero-lead">Describe an accessibility issue and contributors will help suggest solutions — it’s supportive, structured, and private by default.</p>
        </div>
      </section>

      <div style={{maxWidth:900, margin:'18px auto'}}>
        <div className="card">
          <h3>How to get the best help</h3>
          <ul>
            <li>Write a short title summarizing the problem.</li>
            <li>Describe what happened, where it happened, and steps to reproduce.</li>
            <li>Attach screenshots, audio, or a short video if helpful.</li>
            <li>Choose a category so contributors can find your issue quickly.</li>
          </ul>

          <div style={{display:'flex', gap:8, marginTop:12}}>
            <Link to="/submit-problem" className="btn btn-primary">Describe your challenge</Link>
            <Link to="/showcase" className="btn">Browse community solutions</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

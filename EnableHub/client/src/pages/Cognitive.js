import React from 'react'

export default function Cognitive(){
  return (
    <main style={{padding:24}}>
      <h2 style={{color:'#6b4a2a'}}>Cognitive Accessibility</h2>
      <p>Welcome — resources and gentle challenges tailored for cognitive support.</p>
      <section style={{marginTop:16}}>
        <h3>Recent challenges</h3>
        <ul>
          <li>Simplify this flow: onboarding flow for memory aids</li>
          <li>Guided practice: step-by-step coding tasks</li>
        </ul>
      </section>
      <div style={{marginTop:16}}>
        <button className="btn btn-primary">Contribute</button>
        <button className="btn btn-secondary" style={{marginLeft:8}}>Submit problem</button>
      </div>
    </main>
  )
}

import React from 'react'

export default function Neurodivergent(){
  return (
    <main style={{padding:24}}>
      <h2 style={{color:'#5b21b6'}}>Neurodivergent</h2>
      <p>Welcome — options for reduced motion, simplified layouts, and clear step-by-step flows.</p>
      <section style={{marginTop:16}}>
        <h3>Recent challenges</h3>
        <ul>
          <li>Noise-reduced interface modes</li>
          <li>Provide predictable, consistent UI patterns</li>
        </ul>
      </section>
      <div style={{marginTop:16}}>
        <button className="btn btn-primary">Contribute</button>
        <button className="btn btn-secondary" style={{marginLeft:8}}>Submit problem</button>
      </div>
    </main>
  )
}

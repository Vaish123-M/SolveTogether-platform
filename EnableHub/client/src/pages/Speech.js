import React from 'react'

export default function Speech(){
  return (
    <main style={{padding:24}}>
      <h2 style={{color:'#7c2d12'}}>Speech Accessibility</h2>
      <p>Welcome — voice control friendliness and clear prompts for non-verbal users.</p>
      <section style={{marginTop:16}}>
        <h3>Recent challenges</h3>
        <ul>
          <li>Improve voice-command discoverability</li>
          <li>Add fallback controls for non-verbal users</li>
        </ul>
      </section>
      <div style={{marginTop:16}}>
        <button className="btn btn-primary">Contribute</button>
        <button className="btn btn-secondary" style={{marginLeft:8}}>Submit problem</button>
      </div>
    </main>
  )
}

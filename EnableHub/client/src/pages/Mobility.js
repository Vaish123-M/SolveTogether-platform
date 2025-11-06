import React from 'react'

export default function Mobility(){
  return (
    <main style={{padding:24}}>
      <h2 style={{color:'#0c4a6e'}}>Mobility Accessibility</h2>
      <p>Welcome — keyboard-friendly interaction patterns and adaptable controls.</p>
      <section style={{marginTop:16}}>
        <h3>Recent challenges</h3>
        <ul>
          <li>Ensure all actions are reachable via keyboard</li>
          <li>Provide alternatives for drag-and-drop</li>
        </ul>
      </section>
      <div style={{marginTop:16}}>
        <button className="btn btn-primary">Contribute</button>
        <button className="btn btn-secondary" style={{marginLeft:8}}>Submit problem</button>
      </div>
    </main>
  )
}

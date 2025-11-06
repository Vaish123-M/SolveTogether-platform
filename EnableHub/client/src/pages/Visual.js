import React from 'react'

export default function Visual(){
  return (
    <main style={{padding:24}}>
      <h2 style={{color:'#065f46'}}>Visual Accessibility</h2>
      <p>Welcome — high-contrast themes, screen-reader-friendly tasks, and large text examples.</p>
      <section style={{marginTop:16}}>
        <h3>Recent challenges</h3>
        <ul>
          <li>Contrast testing for color choices</li>
          <li>Large-font UI: adapt components to scale</li>
        </ul>
      </section>
      <div style={{marginTop:16}}>
        <button className="btn btn-primary">Contribute</button>
        <button className="btn btn-secondary" style={{marginLeft:8}}>Submit problem</button>
      </div>
    </main>
  )
}

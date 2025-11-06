import React from 'react'

export default function Hearing(){
  return (
    <main style={{padding:24}}>
      <h2 style={{color:'#0f766e'}}>Hearing Accessibility</h2>
      <p>Welcome — visual transcripts, captions, and sound-free challenges.</p>
      <section style={{marginTop:16}}>
        <h3>Recent challenges</h3>
        <ul>
          <li>Captioning practice for short lectures</li>
          <li>Silent UI: design without relying on audio cues</li>
        </ul>
      </section>
      <div style={{marginTop:16}}>
        <button className="btn btn-primary">Contribute</button>
        <button className="btn btn-secondary" style={{marginLeft:8}}>Submit problem</button>
      </div>
    </main>
  )
}

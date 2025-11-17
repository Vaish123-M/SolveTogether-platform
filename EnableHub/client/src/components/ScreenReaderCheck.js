import React, { useState } from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function ScreenReaderCheck(){
  const { performScreenReaderCheck } = useAccessibility()
  const [result, setResult] = useState(null)

  const run = ()=>{
    const r = performScreenReaderCheck()
    setResult(r)
  }

  return (
    <div className="sr-check-panel" aria-live="polite">
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <button className="btn" onClick={run}>Run Screen Reader Check</button>
      </div>
      {result && (
        <div style={{marginTop:12}}>
          <div><strong>Status:</strong> {result.ok ? 'Good' : 'Issues detected'}</div>
          {!result.ok && (
            <ul>
              {result.issues.map((i,idx)=>(<li key={idx}>{i}</li>))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

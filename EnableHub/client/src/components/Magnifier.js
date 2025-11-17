import React, { useEffect, useRef } from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

export default function Magnifier(){
  const { magnifierEnabled } = useAccessibility()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const scale = 1.9

  useEffect(()=>{
    if(!overlayRef.current) return
    const overlay = overlayRef.current
    const root = document.getElementById('root')
    if(!root) return

    // clone root content once
    if(contentRef.current && contentRef.current.innerHTML === ''){
      try{ contentRef.current.innerHTML = root.innerHTML }catch(e){}
    }

    function onMove(e){
      if(!contentRef.current) return
      const x = e.clientX
      const y = e.clientY
      // position overlay center at cursor
      overlay.style.left = (x - 120) + 'px'
      overlay.style.top = (y - 120) + 'px'
      // compute translate to align cloned content so point under cursor is centered
      const rect = root.getBoundingClientRect()
      const relX = x - rect.left
      const relY = y - rect.top
      const tx = -(relX * (scale - 1))
      const ty = -(relY * (scale - 1))
      contentRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
    }

    if(magnifierEnabled){
      document.addEventListener('mousemove', onMove)
      overlay.style.display = 'block'
    }else{
      document.removeEventListener('mousemove', onMove)
      overlay.style.display = 'none'
    }

    return ()=>{
      document.removeEventListener('mousemove', onMove)
      if(overlay) overlay.style.display = 'none'
    }
  },[magnifierEnabled])

  return (
    <div aria-hidden={!magnifierEnabled} className="magnifier-overlay" ref={overlayRef} style={{display:'none'}}>
      <div className="magnifier-lens">
        <div className="magnifier-content" ref={contentRef} aria-hidden="true"></div>
      </div>
    </div>
  )
}

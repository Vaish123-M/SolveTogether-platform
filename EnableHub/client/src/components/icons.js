import React from 'react'

export const HomeIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" fill="currentColor" />
  </svg>
)

export const BrainIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3c2 0 3 1 3 3 2 0 4 2 4 4s-2 4-4 4v2h-6v-1c-2 0-4-2-4-4 0-2 2-4 4-4 0-2 1-3 3-3z" fill="currentColor" />
  </svg>
)

export const EarIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3a6 6 0 0 0-6 6v3a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" fill="currentColor" />
  </svg>
)

export const EyeIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 5c-5 0-9 4-10 7 1 3 5 7 10 7s9-4 10-7c-1-3-5-7-10-7zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="currentColor" />
  </svg>
)

export const WheelchairIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7 3a2 2 0 1 1 0 4h1v3h3v2H8a4 4 0 1 0 4 4 1 1 0 0 1 0-2 2 2 0 1 1-2-2V8H8V7H7V3z" fill="currentColor" />
  </svg>
)

export const SpeechIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 4h16v10H7l-3 3V4z" fill="currentColor" />
  </svg>
)

export const PuzzleIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M21 10h-3v1a2 2 0 0 1-2 2h-1v3h-3v-3H7a2 2 0 0 1-2-2V7h3V6a2 2 0 0 1 2-2h4v3h3v3h3v1z" fill="currentColor" />
  </svg>
)

export const LightbulbIcon = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 21h6v-1a3 3 0 0 0-6 0v1zM12 3a6 6 0 0 0-4 10v1h8v-1a6 6 0 0 0-4-10z" fill="currentColor" />
  </svg>
)

// small icons for accessibility controls
export const MoonIcon = ({size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
  </svg>
)

export const ContrastIcon = ({size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor" />
  </svg>
)

export const SpeakerIcon = ({size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 9v6h4l5 4V5L9 9H5z" fill="currentColor" />
  </svg>
)

export const TargetIcon = ({size=16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
)

export default {}

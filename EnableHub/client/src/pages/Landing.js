import React from 'react'

export default function Landing() {
  return (
    <main>
      <a className="skip-link" href="#main">Skip to content</a>
     

      <section className="hero" role="region" aria-label="Intro">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">EnableHub — Learn together, belong together</h1>
            <p className="hero-lead">A warm, inclusive platform connecting disabled learners with contributors and mentors. Curated paths, real-time feedback, and community support.</p>
            <div className="ctas">
              <a className="btn btn-primary" href="#signup">Get started</a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            {/* simple SVG illustration */}
            <svg width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of people collaborating">
              <rect x="0" y="0" width="280" height="220" rx="16" fill="#fff" stroke="rgba(0,0,0,0.03)"/>
              <circle cx="70" cy="80" r="28" fill="#FFDAB6" />
              <circle cx="140" cy="60" r="26" fill="#FFE6CC" />
              <circle cx="210" cy="90" r="30" fill="#FFEDD5" />
              <rect x="45" y="140" width="190" height="12" rx="6" fill="#FFF3E0" />
              <rect x="55" y="160" width="160" height="8" rx="4" fill="#FFF7ED" />
            </svg>
          </div>
        </div>
      </section>

      {/* Role-based onboarding cards */}
      <section id="roles" style={{padding:'20px 16px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <h2 style={{margin:'6px 0'}}>Choose your role</h2>
          <div className="card-grid">
            <a className="problem-card" href="/onboarding/learner" aria-label="I am a disabled learner">
              <h4>🧑‍🦽 I’m a disabled learner</h4>
              <p>Find tailored resources, support paths, and contributors who can help.</p>
            </a>
            <a className="problem-card" href="/onboarding/contributor" aria-label="I am a contributor">
              <h4>🧑‍💻 I’m a contributor</h4>
              <p>Help solve problems, mentor, and collaborate with learners.</p>
            </a>
            <a className="problem-card" href="/onboarding/mentor" aria-label="I am a mentor">
              <h4>🧑‍🏫 I’m a mentor</h4>
              <p>Offer guidance, run workshops, and support learning journeys.</p>
            </a>
            <a className="problem-card" href="/onboarding/explore" aria-label="I want to explore">
              <h4>🧑‍🎨 I want to explore</h4>
              <p>Browse problems, learn by doing, and discover opportunities to help.</p>
            </a>
          </div>
        </div>
      </section>

      <section id="about" style={{padding:'28px 16px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <h2 style={{color:'#b45309'}}>About EnableHub</h2>
          <p style={{color:'#6b4a2a'}}>We design with accessibility and emotional warmth in mind — inclusive onboarding, assistive workflows, and community-first learning.</p>
        </div>
      </section>

      <footer style={{padding:'18px 16px'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          © {new Date().getFullYear()} EnableHub — Built with care.
        </div>
      </footer>
    </main>
  )
}

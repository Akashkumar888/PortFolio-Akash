import { useEffect, useRef } from 'react'
import '../styles/dsa.css'
import { dsaPlatforms } from '../lib/utils'

const DSA = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const stats = [
    { num: '1400+', label: 'Problems Solved' },
    { num: '700+', label: 'Active Days' },
    { num: '7', label: 'Platforms Active' },
  ]

  return (
    <section id="dsa" className="dsa-section" ref={sectionRef}>
      <div className="dsa-inner">
        <div className="dsa-header reveal">
          <div className="section-label centered">04 — competitive programming</div>
          <h2 className="section-heading">DSA &amp; Coding Profiles</h2>
        </div>

        <div className="dsa-highlight reveal">
          {stats.map((s, i) => (
            <div className="dsa-stat" key={i}>
              <div className="dsa-stat-num">{s.num}</div>
              <div className="dsa-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="platforms-grid">
          {dsaPlatforms.map((p, i) => (
            <a
              key={i}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="platform-card reveal"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <span className="platform-icon">{p.icon}</span>
              <div className="platform-name">{p.name}</div>
              <div className="platform-handle">{p.handle}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DSA

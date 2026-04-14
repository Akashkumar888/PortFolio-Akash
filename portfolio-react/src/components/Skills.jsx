import { useEffect, useRef } from 'react'
import '../styles/skills.css'
import { skillsData } from '../lib/utils'

const Skills = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-inner">
        <div className="skills-header reveal">
          <div className="section-label centered">02 — skills</div>
          <h2 className="section-heading">Technologies I work with</h2>
        </div>

        <div className="skills-grid">
          {skillsData.map((cat, i) => (
            <div
              className="skill-category reveal"
              key={i}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="skill-cat-icon">{cat.icon}</span>
              <div className="skill-cat-title">{cat.title}</div>
              <div className="skill-tags">
                {cat.tags.map((tag, j) => (
                  <span className={`skill-tag ${cat.color}`} key={j}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

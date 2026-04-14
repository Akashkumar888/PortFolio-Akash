import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import '../styles/contact.css'
import { socialLinks } from '../lib/utils'

const Contact = () => {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, message } = form
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('⚠ Please fill in all fields.', {
        style: { background: '#0c1220', color: '#ff4db8', border: '1px solid rgba(255,77,184,0.3)' },
      })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('⚠ Please enter a valid email.', {
        style: { background: '#0c1220', color: '#ff4db8', border: '1px solid rgba(255,77,184,0.3)' },
      })
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setForm({ name: '', email: '', message: '' })
    toast.success('✓ Message sent! I\'ll get back to you soon.', {
      style: { background: '#0c1220', color: '#00ffb3', border: '1px solid rgba(0,255,179,0.3)' },
      duration: 4000,
    })
  }

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-inner">
        <div className="contact-header reveal">
          <div className="section-label centered">05 — contact</div>
          <h2 className="contact-heading">
            <span className="word1">Let's build </span>
            <span className="word2">something great.</span>
          </h2>
          <p className="contact-sub-text">
            Open to SDE Internship opportunities, collaborations, or just a good
            conversation about code. Drop me a message!
          </p>
        </div>

        <div className="contact-body">
          {/* Form */}
          <div className="contact-form-wrap reveal" style={{ transitionDelay: '0.1s' }}>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
            </form>
          </div>

          {/* Info Panel */}
          <div className="contact-info-wrap reveal" style={{ transitionDelay: '0.2s' }}>
            {/* Contact Info */}
            <div className="contact-info-card">
              <div className="info-card-title">Contact Information</div>
              <div className="info-row">
                <div className="info-icon cyan">✉️</div>
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">
                    <a href="mailto:akash.2201216cs@iiitbh.ac.in">akash.2201216cs@iiitbh.ac.in</a>
                  </div>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon purple">💼</div>
                <div>
                  <div className="info-label">LinkedIn</div>
                  <div className="info-value">
                    <a href="https://www.linkedin.com/in/akash-kumar-783a25333" target="_blank" rel="noreferrer">
                      akash-kumar-783a25333
                    </a>
                  </div>
                </div>
              </div>
              <div className="info-row">
                <div className="info-icon pink">📍</div>
                <div>
                  <div className="info-label">Location</div>
                  <div className="info-value">Bhagalpur, Bihar, India</div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="avail-card">
              <div className="avail-header">
                <div className="avail-dot" />
                <div className="avail-title">Currently Available</div>
              </div>
              <p className="avail-text">
                I'm open to SDE internship opportunities and exciting projects. Whether you need
                a full-stack engineer or want to collaborate, let's talk!
              </p>
            </div>

            {/* Social */}
            <div className="contact-info-card">
              <div className="info-card-title" style={{ marginBottom: '1rem' }}>Social Links</div>
              <div className="social-links">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-link">
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

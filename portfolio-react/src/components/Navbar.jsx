import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import { navLinks } from '../lib/utils'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['hero', 'about', 'skills', 'projects', 'dsa', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom > 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <a href="#hero" className="nav-logo" onClick={() => scrollTo('hero')}>
          <span className="logo-word logo-port">Port</span>
          <span className="logo-word logo-folio">folio</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`nav-link ${active === link.toLowerCase() ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.toLowerCase()) }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={`nav-link ${active === link.toLowerCase() ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo(link.toLowerCase()) }}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  )
}

export default Navbar

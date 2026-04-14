import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const bgCanvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })

  // Cursor
  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      const { x: mx, y: my } = mouseRef.current
      const { x: rx, y: ry } = ringPosRef.current

      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'

      ringPosRef.current.x = rx + (mx - rx) * 0.1
      ringPosRef.current.y = ry + (my - ry) * 0.1
      ring.style.left = ringPosRef.current.x + 'px'
      ring.style.top = ringPosRef.current.y + 'px'

      raf = requestAnimationFrame(animate)
    }
    animate()

    const interactive = document.querySelectorAll('a, button, input, textarea, .platform-card, .project-card, .stat-card, .skill-category')
    const onEnter = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'
      ring.style.width = '44px'
      ring.style.height = '44px'
      ring.style.opacity = '0.8'
      ring.style.borderColor = 'var(--accent2)'
    }
    const onLeave = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)'
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.opacity = '0.4'
      ring.style.borderColor = 'var(--accent)'
    }
    interactive.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  // BG Particle Canvas
  useEffect(() => {
    const canvas = bgCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.08,
      hue: Math.random() > 0.6 ? '0,229,255' : Math.random() > 0.5 ? '179,136,255' : '0,255,179',
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.hue},${p.a})`
        ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,229,255,${0.05 * (1 - d / 110)})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
      <canvas id="bg-canvas" ref={bgCanvasRef} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout

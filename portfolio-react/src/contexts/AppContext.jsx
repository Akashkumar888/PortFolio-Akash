import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('scroll', handleScroll)
    setTimeout(() => setIsLoaded(true), 200)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const value = { mousePos, scrollY, activeSection, setActiveSection, isLoaded }

  return (
    <AppContext.Provider value={value}>
      {children}
      </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

export default AppContext

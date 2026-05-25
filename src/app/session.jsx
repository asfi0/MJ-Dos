import React, { createContext, useContext, useState, useCallback } from 'react'
import { getUser } from '../data/demo-users.js'

const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('mjdos_demo_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  const loginAs = useCallback((workspace) => {
    const u = getUser(workspace)
    if (u) {
      setUser(u)
      try { sessionStorage.setItem('mjdos_demo_user', JSON.stringify(u)) } catch {}
    }
    return u
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try { sessionStorage.removeItem('mjdos_demo_user') } catch {}
  }, [])

  return (
    <SessionContext.Provider value={{ user, loginAs, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}

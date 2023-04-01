import React, {useContext, useEffect, useState} from 'react'
import {auth} from '../Auth/firebase'
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}


export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    token
  }

  return(
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}


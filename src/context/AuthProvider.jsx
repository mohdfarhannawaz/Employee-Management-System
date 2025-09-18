import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            setLocalStorage()
            const {employees} = getLocalStorage()
            setUserData(employees || [])
        } catch (error) {
            console.error('Error loading employee data:', error)
            setUserData([])
        } finally {
            setIsLoading(false)
        }
    }, [])
    
    

    return (
        <div>
            <AuthContext.Provider value={[userData, setUserData, isLoading]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider
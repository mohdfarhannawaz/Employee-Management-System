import { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import TaskProvider from './context/TaskProvider'
import NotificationProvider from './context/NotificationProvider'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, , isDataLoading] = useContext(AuthContext)
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser){
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }

  },[])


  const handleLogin = async (email, password) => {
    setIsLoading(true)
    setLoginError('')
    
    // Basic validation
    if (!email || !password) {
      setLoginError('Please enter both email and password')
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setLoginError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (email === 'admin@example.com' && password === '123') {
        setUser('admin')
        localStorage.setItem('loggedInUser', JSON.stringify({ 
          role: 'admin',
          email: email,
          loginTime: new Date().toISOString()
        }))
        setLoginError('')
      } else if (userData) {
        const employee = userData.find((e) => e.email === email && e.password === password)
        if (employee) {
          setUser('employee')
          setLoggedInUserData(employee)
          localStorage.setItem('loggedInUser', JSON.stringify({ 
            role: 'employee',
            data: employee,
            email: email,
            loginTime: new Date().toISOString()
          }))
          setLoginError('')
        } else {
          setLoginError('Invalid email or password')
        }
      } else {
        setLoginError('No employee data available. Please contact administrator.')
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setLoggedInUserData(null)
    setLoginError('')
    localStorage.removeItem('loggedInUser')
  }



  // Show loading screen while data is being loaded
  if (isDataLoading) {
    return (
      <div className='flex h-screen w-screen items-center justify-center bg-gray-900'>
        <div className='text-white text-xl'>Loading application...</div>
      </div>
    )
  }

  return (
    <NotificationProvider>
      <TaskProvider>
        {!user ? (
          <Login 
            handleLogin={handleLogin} 
            error={loginError}
            isLoading={isLoading}
          />
        ) : (
          <>
            {user === 'admin' ? (
              <AdminDashboard changeUser={handleLogout} />
            ) : (
              <EmployeeDashboard changeUser={handleLogout} data={loggedInUserData} />
            )}
          </>
        )}
      </TaskProvider>
    </NotificationProvider>
  )
}

export default App
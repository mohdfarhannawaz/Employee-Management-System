import React, { useState } from 'react'

const Login = ({handleLogin, error, isLoading}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        handleLogin(email, password)
    }


  return (
    <div className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'></div>
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23334155" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20`}></div>
      
      {/* Login Card */}
      <div className='relative w-full max-w-md'>
        <div className='glass rounded-2xl p-8 shadow-2xl border border-white/10'>
          {/* Logo/Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
              </svg>
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Employee Management</h1>
            <p className='text-slate-400'>Sign in to your workspace</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className='bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-center animate-fade-in'>
              <div className='flex items-center justify-center gap-2'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                </svg>
                {error}
              </div>
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={submitHandler} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-slate-300 mb-2'>Email Address</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                  </svg>
                </div>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className='input-field pl-10' 
                  type="email" 
                  placeholder='Enter your email'
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className='block text-sm font-medium text-slate-300 mb-2'>Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                  </svg>
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className='input-field pl-10' 
                  type="password" 
                  placeholder='Enter your password'
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <button 
              type='submit'
              disabled={isLoading}
              className='btn-primary w-full py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>
          
          {/* Demo Credentials */}
          <div className='mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50'>
            <h3 className='text-sm font-medium text-slate-300 mb-3'>Demo Credentials</h3>
            <div className='space-y-2 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='text-slate-400'>Admin:</span>
                <code className='text-blue-400 bg-slate-900/50 px-2 py-1 rounded text-xs'>admin@example.com / 123</code>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-slate-400'>Employee:</span>
                <span className='text-slate-300'>Use assigned credentials</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
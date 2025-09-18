import React from 'react'

const Header = (props) => {
  const username = props.data ? props.data.firstName : 'Admin'
  const userRole = props.data ? 'Employee' : 'Administrator'
  const userEmail = props.data ? props.data.email : 'admin@example.com'

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    props.changeUser('')
  }

  return (
    <div className='flex items-center justify-between mb-8'>
      {/* User Info */}
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg'>
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
          </svg>
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>
            Welcome back, {username}! 👋
          </h1>
          <p className='text-slate-400 text-sm'>
            {userRole} • {userEmail}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-3'>
        {/* Notifications */}
        <button className='relative p-2 text-slate-400 hover:text-white transition-colors'>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z' />
          </svg>
          <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
        </button>

        {/* Logout Button */}
        <button 
          onClick={logOutUser} 
          className='btn-secondary flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
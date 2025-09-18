import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
   const [userData, setUserData] = useContext(AuthContext)

   // Show loading state if data is not available
   if (!userData) {
       return (
           <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
               <div className='text-white'>Loading employee data...</div>
           </div>
       )
   }
   
  return (
    <div className='card p-6'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center'>
          <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
          </svg>
        </div>
        <div>
          <h2 className='text-xl font-semibold text-white'>Task Overview</h2>
          <p className='text-sm text-slate-400'>Employee task statistics and progress</p>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-700'>
              <th className='text-left py-4 px-4 text-sm font-medium text-slate-300'>Employee</th>
              <th className='text-center py-4 px-4 text-sm font-medium text-slate-300'>New Tasks</th>
              <th className='text-center py-4 px-4 text-sm font-medium text-slate-300'>Active</th>
              <th className='text-center py-4 px-4 text-sm font-medium text-slate-300'>Completed</th>
              <th className='text-center py-4 px-4 text-sm font-medium text-slate-300'>Failed</th>
              <th className='text-center py-4 px-4 text-sm font-medium text-slate-300'>Total</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((employee, idx) => {
              const totalTasks = employee.taskCounts.newTask + employee.taskCounts.active + employee.taskCounts.completed + employee.taskCounts.failed
              return (
                <tr key={idx} className='border-b border-slate-800 hover:bg-slate-800/50 transition-colors'>
                  <td className='py-4 px-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
                        <span className='text-xs font-medium text-white'>
                          {employee.firstName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className='font-medium text-white'>{employee.firstName}</p>
                        <p className='text-xs text-slate-400'>{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-4 px-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400'>
                      {employee.taskCounts.newTask}
                    </span>
                  </td>
                  <td className='text-center py-4 px-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400'>
                      {employee.taskCounts.active}
                    </span>
                  </td>
                  <td className='text-center py-4 px-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400'>
                      {employee.taskCounts.completed}
                    </span>
                  </td>
                  <td className='text-center py-4 px-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400'>
                      {employee.taskCounts.failed}
                    </span>
                  </td>
                  <td className='text-center py-4 px-4'>
                    <span className='font-medium text-white'>{totalTasks}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllTask
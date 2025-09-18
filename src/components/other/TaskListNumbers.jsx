import React from 'react'

const TaskListNumbers = (props) => {
  const { taskCounts = {} } = props || {};

  // Add null checks to prevent errors
  if (!props || !taskCounts) {
    return (
      <div className='flex mt-10 justify-between gap-5 screen'>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-gray-400'>
          <h2 className='text-3xl font-bold'>Loading...</h2>
          <h3 className='text-xl mt-0.5 font-medium'>Please wait</h3>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {/* New Tasks */}
        <div className='card p-6 hover:scale-105 transition-all duration-200'>
            <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                    </svg>
                </div>
                <span className='text-xs text-slate-400 font-medium'>NEW</span>
            </div>
            <h2 className='text-3xl font-bold text-white mb-1'>{taskCounts.newTask || 0}</h2>
            <p className='text-slate-400 text-sm'>New Tasks</p>
        </div>

        {/* Active Tasks */}
        <div className='card p-6 hover:scale-105 transition-all duration-200'>
            <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                    </svg>
                </div>
                <span className='text-xs text-slate-400 font-medium'>ACTIVE</span>
            </div>
            <h2 className='text-3xl font-bold text-white mb-1'>{taskCounts.active || 0}</h2>
            <p className='text-slate-400 text-sm'>In Progress</p>
        </div>

        {/* Completed Tasks */}
        <div className='card p-6 hover:scale-105 transition-all duration-200'>
            <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                </div>
                <span className='text-xs text-slate-400 font-medium'>DONE</span>
            </div>
            <h2 className='text-3xl font-bold text-white mb-1'>{taskCounts.completed || 0}</h2>
            <p className='text-slate-400 text-sm'>Completed</p>
        </div>

        {/* Failed Tasks */}
        <div className='card p-6 hover:scale-105 transition-all duration-200'>
            <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
                    </svg>
                </div>
                <span className='text-xs text-slate-400 font-medium'>FAILED</span>
            </div>
            <h2 className='text-3xl font-bold text-white mb-1'>{taskCounts.failed || 0}</h2>
            <p className='text-slate-400 text-sm'>Failed</p>
        </div>
    </div>
  )
}

export default TaskListNumbers
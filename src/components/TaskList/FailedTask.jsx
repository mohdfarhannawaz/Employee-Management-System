import React from 'react'
import { useTask } from '../../context/TaskProvider'

const FailedTask = ({data, employeeId}) => {
    const { deleteTask, updateTaskStatus } = useTask()

    const handleDeleteTask = () => {
        if (window.confirm('Are you sure you want to delete this failed task?')) {
            deleteTask(data.id, employeeId)
        }
    }

    const handleRetryTask = () => {
        if (window.confirm('Are you sure you want to retry this task?')) {
            updateTaskStatus(data.id, 'active', employeeId)
        }
    }

    return (
        <div className='flex-shrink-0 w-80 card p-6 hover:scale-105 transition-all duration-200 animate-fade-in'>
            {/* Header */}
            <div className='flex justify-between items-start mb-4'>
                <div className='flex gap-2'>
                    <span className='status-failed text-xs px-3 py-1 rounded-full font-medium'>
                        {data.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium priority-${data.priority || 'medium'}`}>
                        {data.priority?.toUpperCase() || 'MEDIUM'}
                    </span>
                </div>
                <div className='text-right'>
                    <p className='text-xs text-slate-400'>Due Date</p>
                    <p className='text-sm font-medium text-slate-300'>{new Date(data.taskDate).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Content */}
            <div className='mb-6'>
                <h3 className='text-lg font-semibold text-white mb-2 line-clamp-2'>{data.taskTitle}</h3>
                <p className='text-sm text-slate-400 line-clamp-3 leading-relaxed'>
                    {data.taskDescription}
                </p>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between pt-4 border-t border-slate-700'>
                <div className='flex items-center gap-2 text-xs text-red-400'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
                    </svg>
                    Failed
                </div>
                <div className='flex gap-2'>
                    <button 
                        onClick={handleRetryTask}
                        className='bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300 text-xs px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 border border-yellow-500/20'
                    >
                        <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                        </svg>
                        Retry
                    </button>
                    <button 
                        onClick={handleDeleteTask}
                        className='bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 border border-red-500/20'
                    >
                        <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FailedTask
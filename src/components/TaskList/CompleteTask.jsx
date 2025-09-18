import React from 'react'
import { useTask } from '../../context/TaskProvider'

const CompleteTask = ({data, employeeId}) => {
    const { deleteTask } = useTask()

    const handleDeleteTask = () => {
        if (window.confirm('Are you sure you want to delete this completed task?')) {
            deleteTask(data.id, employeeId)
        }
    }

    return (
        <div className='flex-shrink-0 w-80 card p-6 hover:scale-105 transition-all duration-200 animate-fade-in'>
            {/* Header */}
            <div className='flex justify-between items-start mb-4'>
                <div className='flex gap-2'>
                    <span className='status-completed text-xs px-3 py-1 rounded-full font-medium'>
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
                <div className='flex items-center gap-2 text-xs text-green-400'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    Completed
                </div>
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
    )
}

export default CompleteTask
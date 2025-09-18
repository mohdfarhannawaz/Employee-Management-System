import React from 'react'
import { useTask } from '../../context/TaskProvider'

const AcceptTask = ({data, employeeId}) => {
    const { updateTaskStatus } = useTask()

    const handleCompleteTask = () => {
        if (window.confirm('Are you sure you want to mark this task as completed?')) {
            updateTaskStatus(data.id, 'completed', employeeId)
        }
    }

    const handleFailTask = () => {
        if (window.confirm('Are you sure you want to mark this task as failed?')) {
            updateTaskStatus(data.id, 'failed', employeeId)
        }
    }

    return (
        <div className='flex-shrink-0 w-80 card p-6 hover:scale-105 transition-all duration-200 animate-fade-in'>
            {/* Header */}
            <div className='flex justify-between items-start mb-4'>
                <div className='flex gap-2'>
                    <span className='status-active text-xs px-3 py-1 rounded-full font-medium'>
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
                <div className='flex items-center gap-2 text-xs text-slate-400'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                    </svg>
                    In Progress
                </div>
                <div className='flex gap-2'>
                    <button 
                        onClick={handleCompleteTask}
                        className='bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1'
                    >
                        <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        Complete
                    </button>
                    <button 
                        onClick={handleFailTask}
                        className='bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1'
                    >
                        <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                        Fail
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AcceptTask
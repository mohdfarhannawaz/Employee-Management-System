import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useNotification } from '../../context/NotificationProvider'

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext)
    const { addNotification } = useNotification()

    // Show loading state if data is not available
    if (!userData) {
        return (
            <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
                <div className='text-white'>Loading employee data...</div>
            </div>
        )
    }

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('medium')

    const [newTask, setNewTask] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        // Validate required fields
        if (!taskTitle || !taskDescription || !taskDate || !asignTo || !category) {
            addNotification('Please fill in all fields', 'error')
            return
        }

        // Create new task object
        const newTask = { 
            id: Date.now(), // Add unique ID
            taskTitle, 
            taskDescription, 
            taskDate, 
            category, 
            priority,
            active: false, 
            newTask: true, 
            failed: false, 
            completed: false,
            createdAt: new Date().toISOString(),
            assignedTo: asignTo
        }

        // Find and update the employee
        const data = [...userData] // Create a copy to avoid mutation
        let taskAssigned = false

        data.forEach(function (elem) {
            if (asignTo === elem.firstName) {
                elem.tasks.push(newTask)
                elem.taskCounts.newTask = elem.taskCounts.newTask + 1
                taskAssigned = true
            }
        })

        if (!taskAssigned) {
            addNotification('Employee not found. Please check the employee name.', 'error')
            return
        }

        // Update localStorage
        localStorage.setItem('employees', JSON.stringify(data))
        setUserData(data)

        // Show success message
        addNotification(`Task "${taskTitle}" created successfully for ${asignTo}!`, 'success')

        // Reset form
        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')
        setPriority('medium')
    }

    return (
        <div className='card p-8'>
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center'>
                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                    </svg>
                </div>
                <div>
                    <h2 className='text-xl font-semibold text-white'>Create New Task</h2>
                    <p className='text-sm text-slate-400'>Assign a new task to an employee</p>
                </div>
            </div>

            <form onSubmit={submitHandler} className='space-y-6'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Left Column */}
                    <div className='space-y-6'>
                    <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2'>Task Title</label>
                        <input
                            value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                className='input-field'
                                type="text" 
                                placeholder='Enter task title...'
                                required
                        />
                    </div>

                    <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2'>Due Date</label>
                        <input
                            value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                                className='input-field'
                                type="date"
                                required
                            />
                    </div>

                    <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2'>Assign to Employee</label>
                            <select
                            value={asignTo}
                                onChange={(e) => setAsignTo(e.target.value)}
                                className='select-field'
                                required
                            >
                                <option value="">Select Employee</option>
                                {userData && userData.map((employee) => (
                                    <option key={employee.id} value={employee.firstName}>
                                        {employee.firstName} ({employee.email})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2'>Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className='select-field'
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Design">Design</option>
                                    <option value="Development">Development</option>
                                    <option value="Testing">Testing</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Meeting">Meeting</option>
                                    <option value="Support">Support</option>
                                    <option value="Documentation">Documentation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-slate-300 mb-2'>Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className='select-field'
                                    required
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='space-y-6'>
                    <div>
                            <label className='block text-sm font-medium text-slate-300 mb-2'>Task Description</label>
                            <textarea 
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className='input-field h-40 resize-none'
                                placeholder='Describe the task details...'
                                required
                            />
                        </div>

                        <div className='flex gap-4 pt-4'>
                            <button 
                                type='submit'
                                className='btn-primary flex-1 flex items-center justify-center gap-2'
                            >
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                </svg>
                                Create Task
                            </button>
                            <button 
                                type='button'
                                onClick={() => {
                                    setTaskTitle('')
                                    setCategory('')
                                    setAsignTo('')
                                    setTaskDate('')
                                    setTaskDescription('')
                                    setPriority('medium')
                                }}
                                className='btn-secondary flex items-center gap-2 px-6'
                            >
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                </svg>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateTask
import React, { useState, useMemo } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // Filter tasks based on search and filters
  const filteredData = useMemo(() => {
    if (!props.data || !props.data.tasks) return props.data

    let filteredTasks = props.data.tasks

    // Filter by search term
    if (searchTerm) {
      filteredTasks = filteredTasks.filter(task =>
        task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task[statusFilter])
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.category === categoryFilter)
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter)
    }

    return {
      ...props.data,
      tasks: filteredTasks
    }
  }, [props.data, searchTerm, statusFilter, categoryFilter, priorityFilter])

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    if (!props.data || !props.data.tasks) return []
    const uniqueCategories = [...new Set(props.data.tasks.map(task => task.category))]
    return uniqueCategories
  }, [props.data])

  // Show loading state if data is not available
  if (!props.data) {
    return (
      <div className='p-10 bg-[#1C1C1C] h-screen flex items-center justify-center'>
        <div className='text-white text-xl'>Loading employee data...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6'>
      <div className='max-w-7xl mx-auto'>
        <Header changeUser={props.changeUser} data={props.data}/>
        
        {/* Search and Filter Controls */}
        <div className='card p-6 mb-8'>
          <div className='flex flex-wrap gap-4 items-end'>
            {/* Search */}
            <div className='flex-1 min-w-64'>
              <label className='block text-sm font-medium text-slate-300 mb-2'>Search Tasks</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </div>
                <input
                  type='text'
                  placeholder='Search by title or description...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='input-field pl-10'
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className='min-w-48'>
              <label className='block text-sm font-medium text-slate-300 mb-2'>Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='select-field'
              >
                <option value='all'>All Status</option>
                <option value='newTask'>New Tasks</option>
                <option value='active'>Active Tasks</option>
                <option value='completed'>Completed</option>
                <option value='failed'>Failed</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div className='min-w-48'>
              <label className='block text-sm font-medium text-slate-300 mb-2'>Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className='select-field'
              >
                <option value='all'>All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Priority Filter */}
            <div className='min-w-48'>
              <label className='block text-sm font-medium text-slate-300 mb-2'>Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className='select-field'
              >
                <option value='all'>All Priorities</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
                <option value='urgent'>Urgent</option>
              </select>
            </div>
            
            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
                setCategoryFilter('all')
                setPriorityFilter('all')
              }}
              className='btn-secondary flex items-center gap-2 px-4 py-2 text-sm'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
              Clear
            </button>
          </div>
        </div>

        <TaskListNumbers taskCounts={props.data?.taskCounts} />
        
        {/* Task List Section */}
        <div className='card p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-semibold text-white'>Your Tasks</h2>
            <div className='text-sm text-slate-400'>
              {filteredData?.tasks?.length || 0} task(s) found
            </div>
          </div>
          <TaskList tasks={filteredData?.tasks || []} id={filteredData?.id} />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
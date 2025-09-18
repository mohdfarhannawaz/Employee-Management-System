import React, { useContext, useMemo } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const Analytics = () => {
    const [userData] = useContext(AuthContext)

    // Show loading state if data is not available
    if (!userData) {
        return (
            <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
                <div className='text-white'>Loading analytics data...</div>
            </div>
        )
    }

    const analytics = useMemo(() => {
        if (!userData || !Array.isArray(userData)) return null

        const totalEmployees = userData.length
        let totalTasks = 0
        let totalNewTasks = 0
        let totalActiveTasks = 0
        let totalCompletedTasks = 0
        let totalFailedTasks = 0
        let tasksByCategory = {}
        let tasksByPriority = {}
        let topPerformers = []

        userData.forEach(employee => {
            totalTasks += employee.tasks.length
            totalNewTasks += employee.taskCounts.newTask
            totalActiveTasks += employee.taskCounts.active
            totalCompletedTasks += employee.taskCounts.completed
            totalFailedTasks += employee.taskCounts.failed

            // Calculate completion rate for top performers
            const completionRate = employee.taskCounts.completed / Math.max(employee.tasks.length, 1) * 100
            topPerformers.push({
                name: employee.firstName,
                email: employee.email,
                completed: employee.taskCounts.completed,
                total: employee.tasks.length,
                completionRate: Math.round(completionRate)
            })

            // Count tasks by category and priority
            employee.tasks.forEach(task => {
                tasksByCategory[task.category] = (tasksByCategory[task.category] || 0) + 1
                tasksByPriority[task.priority || 'medium'] = (tasksByPriority[task.priority || 'medium'] || 0) + 1
            })
        })

        // Sort top performers by completion rate
        topPerformers.sort((a, b) => b.completionRate - a.completionRate)

        return {
            totalEmployees,
            totalTasks,
            totalNewTasks,
            totalActiveTasks,
            totalCompletedTasks,
            totalFailedTasks,
            tasksByCategory,
            tasksByPriority,
            topPerformers: topPerformers.slice(0, 5)
        }
    }, [userData])

    if (!analytics) {
        return <div className='text-white'>Loading analytics...</div>
    }

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <h2 className='text-xl font-semibold text-white mb-5'>Analytics Dashboard</h2>
            
            {/* Overview Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                <div className='bg-blue-600 p-4 rounded-lg'>
                    <h3 className='text-blue-100 text-sm'>Total Employees</h3>
                    <p className='text-2xl font-bold text-white'>{analytics.totalEmployees}</p>
                </div>
                <div className='bg-green-600 p-4 rounded-lg'>
                    <h3 className='text-green-100 text-sm'>Total Tasks</h3>
                    <p className='text-2xl font-bold text-white'>{analytics.totalTasks}</p>
                </div>
                <div className='bg-yellow-600 p-4 rounded-lg'>
                    <h3 className='text-yellow-100 text-sm'>Active Tasks</h3>
                    <p className='text-2xl font-bold text-white'>{analytics.totalActiveTasks}</p>
                </div>
                <div className='bg-emerald-600 p-4 rounded-lg'>
                    <h3 className='text-emerald-100 text-sm'>Completed Tasks</h3>
                    <p className='text-2xl font-bold text-white'>{analytics.totalCompletedTasks}</p>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Task Status Breakdown */}
                <div className='bg-gray-800 p-4 rounded-lg'>
                    <h3 className='text-lg font-medium text-white mb-4'>Task Status Breakdown</h3>
                    <div className='space-y-3'>
                        <div className='flex justify-between items-center'>
                            <span className='text-blue-400'>New Tasks</span>
                            <span className='text-white font-medium'>{analytics.totalNewTasks}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='text-yellow-400'>Active Tasks</span>
                            <span className='text-white font-medium'>{analytics.totalActiveTasks}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='text-green-400'>Completed Tasks</span>
                            <span className='text-white font-medium'>{analytics.totalCompletedTasks}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='text-red-400'>Failed Tasks</span>
                            <span className='text-white font-medium'>{analytics.totalFailedTasks}</span>
                        </div>
                    </div>
                </div>

                {/* Top Performers */}
                <div className='bg-gray-800 p-4 rounded-lg'>
                    <h3 className='text-lg font-medium text-white mb-4'>Top Performers</h3>
                    <div className='space-y-3'>
                        {analytics.topPerformers.map((performer, index) => (
                            <div key={index} className='flex justify-between items-center'>
                                <div>
                                    <span className='text-white font-medium'>{performer.name}</span>
                                    <p className='text-gray-400 text-sm'>{performer.email}</p>
                                </div>
                                <div className='text-right'>
                                    <span className='text-white font-medium'>{performer.completionRate}%</span>
                                    <p className='text-gray-400 text-sm'>{performer.completed}/{performer.total} tasks</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                {/* Tasks by Category */}
                <div className='bg-gray-800 p-4 rounded-lg'>
                    <h3 className='text-lg font-medium text-white mb-4'>Tasks by Category</h3>
                    <div className='space-y-3'>
                        {Object.entries(analytics.tasksByCategory).map(([category, count]) => (
                            <div key={category} className='flex justify-between items-center'>
                                <span className='text-white'>{category}</span>
                                <span className='text-emerald-400 font-medium'>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tasks by Priority */}
                <div className='bg-gray-800 p-4 rounded-lg'>
                    <h3 className='text-lg font-medium text-white mb-4'>Tasks by Priority</h3>
                    <div className='space-y-3'>
                        {Object.entries(analytics.tasksByPriority).map(([priority, count]) => (
                            <div key={priority} className='flex justify-between items-center'>
                                <span className={`capitalize ${
                                    priority === 'urgent' ? 'text-red-400' :
                                    priority === 'high' ? 'text-orange-400' :
                                    priority === 'medium' ? 'text-yellow-400' :
                                    'text-gray-400'
                                }`}>
                                    {priority}
                                </span>
                                <span className='text-white font-medium'>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics

import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthProvider'
import { useNotification } from './NotificationProvider'

export const TaskContext = createContext()

export const useTask = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }
    return context
}

const TaskProvider = ({ children }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const { addNotification } = useNotification()

    const updateTaskStatus = (taskId, newStatus, employeeId) => {
        if (!userData || !Array.isArray(userData)) {
            console.error('UserData is not available or not an array')
            return
        }
        
        const data = [...userData]
        let taskTitle = ''
        let employeeName = ''
        
        data.forEach(employee => {
            if (employee.id === employeeId) {
                employeeName = employee.firstName
                employee.tasks.forEach(task => {
                    if (task.id === taskId) {
                        taskTitle = task.taskTitle
                        
                        // Reset all status flags
                        task.active = false
                        task.newTask = false
                        task.completed = false
                        task.failed = false
                        
                        // Set new status
                        task[newStatus] = true
                        
                        // Update task counts
                        if (newStatus === 'active') {
                            employee.taskCounts.newTask = Math.max(0, employee.taskCounts.newTask - 1)
                            employee.taskCounts.active += 1
                        } else if (newStatus === 'completed') {
                            employee.taskCounts.active = Math.max(0, employee.taskCounts.active - 1)
                            employee.taskCounts.completed += 1
                        } else if (newStatus === 'failed') {
                            employee.taskCounts.active = Math.max(0, employee.taskCounts.active - 1)
                            employee.taskCounts.failed += 1
                        }
                    }
                })
            }
        })
        
        // Update localStorage
        localStorage.setItem('employees', JSON.stringify(data))
        setUserData(data)
        
        // Show notification
        const statusMessages = {
            active: `Task "${taskTitle}" accepted by ${employeeName}`,
            completed: `Task "${taskTitle}" completed by ${employeeName}`,
            failed: `Task "${taskTitle}" marked as failed by ${employeeName}`
        }
        
        addNotification(statusMessages[newStatus], newStatus === 'completed' ? 'success' : newStatus === 'failed' ? 'error' : 'info')
    }

    const deleteTask = (taskId, employeeId) => {
        if (!userData || !Array.isArray(userData)) {
            console.error('UserData is not available or not an array')
            return
        }
        
        const data = [...userData]
        let taskTitle = ''
        let employeeName = ''
        
        data.forEach(employee => {
            if (employee.id === employeeId) {
                employeeName = employee.firstName
                const taskIndex = employee.tasks.findIndex(task => task.id === taskId)
                if (taskIndex !== -1) {
                    const task = employee.tasks[taskIndex]
                    taskTitle = task.taskTitle
                    
                    // Update counts based on current status
                    if (task.newTask) {
                        employee.taskCounts.newTask = Math.max(0, employee.taskCounts.newTask - 1)
                    } else if (task.active) {
                        employee.taskCounts.active = Math.max(0, employee.taskCounts.active - 1)
                    } else if (task.completed) {
                        employee.taskCounts.completed = Math.max(0, employee.taskCounts.completed - 1)
                    } else if (task.failed) {
                        employee.taskCounts.failed = Math.max(0, employee.taskCounts.failed - 1)
                    }
                    
                    // Remove task
                    employee.tasks.splice(taskIndex, 1)
                }
            }
        })
        
        // Update localStorage
        localStorage.setItem('employees', JSON.stringify(data))
        setUserData(data)
        
        // Show notification
        addNotification(`Task "${taskTitle}" deleted for ${employeeName}`, 'info')
    }

    const value = {
        updateTaskStatus,
        deleteTask
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider

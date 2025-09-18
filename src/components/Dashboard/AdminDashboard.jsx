import React, { useState } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import EmployeeManagement from '../other/EmployeeManagement'
import Analytics from '../other/Analytics'

const AdminDashboard = (props) => {
    const [activeTab, setActiveTab] = useState('tasks')

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6'>
            <div className='max-w-7xl mx-auto'>
                <Header changeUser={props.changeUser} />
                
                {/* Professional Tab Navigation */}
                <div className='card p-2 mb-8'>
                    <div className='flex gap-2'>
                        <button 
                            onClick={() => setActiveTab('tasks')}
                            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                activeTab === 'tasks' 
                                    ? 'bg-blue-500 text-white shadow-lg' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                            </svg>
                            Task Management
                        </button>
                        <button 
                            onClick={() => setActiveTab('employees')}
                            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                activeTab === 'employees' 
                                    ? 'bg-blue-500 text-white shadow-lg' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                            </svg>
                            Employee Management
                        </button>
                        <button 
                            onClick={() => setActiveTab('analytics')}
                            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                activeTab === 'analytics' 
                                    ? 'bg-blue-500 text-white shadow-lg' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                            </svg>
                            Analytics
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className='animate-fade-in'>
                    {activeTab === 'tasks' && (
                        <div className='space-y-8'>
                            <CreateTask />
                            <AllTask />
                        </div>
                    )}
                    
                    {activeTab === 'employees' && (
                        <EmployeeManagement />
                    )}
                    
                    {activeTab === 'analytics' && (
                        <Analytics />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
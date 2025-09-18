import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useNotification } from '../../context/NotificationProvider'

const EmployeeManagement = () => {
    const [userData, setUserData] = useContext(AuthContext)
    const { addNotification } = useNotification()
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState(null)
    
    // Form states
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Show loading state if data is not available
    if (!userData) {
        return (
            <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
                <div className='text-white'>Loading employee data...</div>
            </div>
        )
    }

    const handleAddEmployee = (e) => {
        e.preventDefault()
        
        if (!firstName || !email || !password) {
            addNotification('Please fill in all fields', 'error')
            return
        }

        // Check if email already exists
        const emailExists = userData.some(emp => emp.email === email)
        if (emailExists) {
            addNotification('Email already exists', 'error')
            return
        }

        const newEmployee = {
            id: Date.now(),
            firstName,
            email,
            password,
            taskCounts: {
                active: 0,
                newTask: 0,
                completed: 0,
                failed: 0
            },
            tasks: []
        }

        const updatedData = [...userData, newEmployee]
        localStorage.setItem('employees', JSON.stringify(updatedData))
        setUserData(updatedData)
        
        // Reset form
        setFirstName('')
        setEmail('')
        setPassword('')
        setShowAddForm(false)
        
        addNotification(`Employee "${firstName}" added successfully!`, 'success')
    }

    const handleEditEmployee = (employee) => {
        setEditingEmployee(employee)
        setFirstName(employee.firstName)
        setEmail(employee.email)
        setPassword(employee.password)
        setShowAddForm(true)
    }

    const handleUpdateEmployee = (e) => {
        e.preventDefault()
        
        if (!firstName || !email || !password) {
            addNotification('Please fill in all fields', 'error')
            return
        }

        // Check if email already exists (excluding current employee)
        const emailExists = userData.some(emp => emp.email === email && emp.id !== editingEmployee.id)
        if (emailExists) {
            addNotification('Email already exists', 'error')
            return
        }

        const updatedData = userData.map(emp => 
            emp.id === editingEmployee.id 
                ? { ...emp, firstName, email, password }
                : emp
        )
        
        localStorage.setItem('employees', JSON.stringify(updatedData))
        setUserData(updatedData)
        
        // Reset form
        setFirstName('')
        setEmail('')
        setPassword('')
        setShowAddForm(false)
        setEditingEmployee(null)
        
        addNotification(`Employee "${firstName}" updated successfully!`, 'success')
    }

    const handleDeleteEmployee = (employeeId) => {
        const employee = userData.find(emp => emp.id === employeeId)
        if (window.confirm(`Are you sure you want to delete ${employee?.firstName}? This will also delete all their tasks.`)) {
            const updatedData = userData.filter(emp => emp.id !== employeeId)
            localStorage.setItem('employees', JSON.stringify(updatedData))
            setUserData(updatedData)
            addNotification(`Employee "${employee?.firstName}" deleted successfully!`, 'success')
        }
    }

    const cancelForm = () => {
        setFirstName('')
        setEmail('')
        setPassword('')
        setShowAddForm(false)
        setEditingEmployee(null)
    }

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-xl font-semibold text-white'>Employee Management</h2>
                <button 
                    onClick={() => setShowAddForm(true)}
                    className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded transition-colors'
                >
                    Add Employee
                </button>
            </div>

            {showAddForm && (
                <div className='bg-gray-800 p-5 rounded mb-5'>
                    <h3 className='text-lg font-medium text-white mb-4'>
                        {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                    </h3>
                    <form onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div>
                                <label className='block text-sm text-gray-300 mb-1'>First Name</label>
                                <input
                                    type='text'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-emerald-500'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm text-gray-300 mb-1'>Email</label>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-emerald-500'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-sm text-gray-300 mb-1'>Password</label>
                                <input
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-emerald-500'
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex gap-2 mt-4'>
                            <button 
                                type='submit'
                                className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded transition-colors'
                            >
                                {editingEmployee ? 'Update Employee' : 'Add Employee'}
                            </button>
                            <button 
                                type='button'
                                onClick={cancelForm}
                                className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className='overflow-x-auto'>
                <table className='w-full text-white'>
                    <thead>
                        <tr className='bg-gray-800'>
                            <th className='px-4 py-3 text-left'>Name</th>
                            <th className='px-4 py-3 text-left'>Email</th>
                            <th className='px-4 py-3 text-center'>New Tasks</th>
                            <th className='px-4 py-3 text-center'>Active Tasks</th>
                            <th className='px-4 py-3 text-center'>Completed</th>
                            <th className='px-4 py-3 text-center'>Failed</th>
                            <th className='px-4 py-3 text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData && userData.map((employee) => (
                            <tr key={employee.id} className='border-b border-gray-700 hover:bg-gray-800'>
                                <td className='px-4 py-3'>{employee.firstName}</td>
                                <td className='px-4 py-3'>{employee.email}</td>
                                <td className='px-4 py-3 text-center text-blue-400'>{employee.taskCounts.newTask}</td>
                                <td className='px-4 py-3 text-center text-yellow-400'>{employee.taskCounts.active}</td>
                                <td className='px-4 py-3 text-center text-green-400'>{employee.taskCounts.completed}</td>
                                <td className='px-4 py-3 text-center text-red-400'>{employee.taskCounts.failed}</td>
                                <td className='px-4 py-3 text-center'>
                                    <div className='flex gap-2 justify-center'>
                                        <button 
                                            onClick={() => handleEditEmployee(employee)}
                                            className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors'
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteEmployee(employee.id)}
                                            className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeManagement

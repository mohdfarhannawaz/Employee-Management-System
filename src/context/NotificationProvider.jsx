import React, { createContext, useContext, useState } from 'react'

export const NotificationContext = createContext()

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])

    const addNotification = (message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random()
        const notification = {
            id,
            message,
            type, // 'success', 'error', 'warning', 'info'
            duration
        }

        setNotifications(prev => [...prev, notification])

        // Auto remove notification after duration
        setTimeout(() => {
            removeNotification(id)
        }, duration)
    }

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id))
    }

    const clearAllNotifications = () => {
        setNotifications([])
    }

    const value = {
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <NotificationContainer />
        </NotificationContext.Provider>
    )
}

const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotification()

    const getNotificationStyles = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white'
            case 'error':
                return 'bg-red-500 text-white'
            case 'warning':
                return 'bg-yellow-500 text-black'
            case 'info':
            default:
                return 'bg-blue-500 text-white'
        }
    }

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return '✓'
            case 'error':
                return '✗'
            case 'warning':
                return '⚠'
            case 'info':
            default:
                return 'ℹ'
        }
    }

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`${getNotificationStyles(notification.type)} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-80 max-w-96 animate-slide-in`}
                >
                    <span className="text-lg font-bold">{getIcon(notification.type)}</span>
                    <span className="flex-1">{notification.message}</span>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-white hover:text-gray-200 font-bold text-lg"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    )
}

export default NotificationProvider

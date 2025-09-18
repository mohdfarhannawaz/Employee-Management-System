import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = (props) => {
    const { tasks = [] } = props || {} // Now use tasks safely

    // Check if tasks array is empty
    if (tasks.length === 0) {
        return (
            <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-center gap-5 flex-nowrap w-full py-1 mt-16'>
                <div className='text-white text-lg'>No tasks available</div>
            </div>
        )
    }

    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
            {tasks.map((elem, idx) => {
                if (elem.active) {
                    return <AcceptTask key={elem.id || idx} data={elem} employeeId={props.id} />
                }
                if (elem.newTask) {
                    return <NewTask key={elem.id || idx} data={elem} employeeId={props.id} />
                }
                if (elem.completed) {
                    return <CompleteTask key={elem.id || idx} data={elem} employeeId={props.id} />
                }
                if (elem.failed) {
                    return <FailedTask key={elem.id || idx} data={elem} employeeId={props.id} />
                }
                return null
            })}
        </div>
    )
}

export default TaskList
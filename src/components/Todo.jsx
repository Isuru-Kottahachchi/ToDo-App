import React, { useContext, useState } from 'react'
import Classes from './Todo.module.css'
import { DeleteFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { TodoContext } from '../store/TodoContext';
import { Spin } from 'antd';


import axios from 'axios';

const Todo = () => {

    const { state, dispatch } = useContext(TodoContext);
    const { tasks } = state;
    const [isLoading, setIsLoading] = useState(false);

    console.log(tasks)

    const deleteHandler = async (id) => {

        const url = 'api/v1/task/' + id;
        setIsLoading(true);
        try {

            const confirmed = window.confirm('Are you sure you want to delete this task?');
            if (confirmed) {

                await axios.delete(
                    url,
                    {
                        headers: {
                            Authorization: 'Bearer Q3jc33KrD7zCaLEU8GNu2ZlPoXPoFwgtLF9kH-FwGWycoOM5jg'
                        },
                    }
                );
                //dispatch({ type: 'REMOVE_TASK', payload: id });
                console.log('Task deleted successfully!');
            }

            const response = await axios.get('api/v1/task', {
                headers: {
                    Authorization: 'Bearer Q3jc33KrD7zCaLEU8GNu2ZlPoXPoFwgtLF9kH-FwGWycoOM5jg'
                }
            });
            dispatch({ type: 'SET_TASKS', payload: response.data.items });
            setIsLoading(false);

        } catch (error) {
            console.error('Error deleting task:', error);
        }

    }

    const handleCheckboxChange = async (id) => {
        setIsLoading(true);
        const url = 'api/v1/task/' + id;
        const taskWithUUID = tasks.find(task => task._uuid === id);
        try {
            if (taskWithUUID) {
                const completed = taskWithUUID.completed;

                await axios.put(
                    url, { "completed": !completed },
                    {
                        headers: {
                            Authorization: 'Bearer Q3jc33KrD7zCaLEU8GNu2ZlPoXPoFwgtLF9kH-FwGWycoOM5jg'
                        },
                    }
                );
            }
            setIsLoading(false);

            dispatch({ type: 'CHANGE_TASK_STATUS', payload: id });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={Classes.todo}>
            {isLoading && <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>}
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <div>
                            <input type="checkbox" id="" checked={task.completed} value="" onChange={() => handleCheckboxChange(task._uuid)} />
                        </div>
                        <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                        </p>
                        <Button onClick={() => deleteHandler(task._uuid)}><DeleteFilled /></Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo;
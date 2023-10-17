import React, { useContext } from 'react'
import Classes from './Todo.module.css'
import { DeleteFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { TodoContext } from '../store/TodoContext';

import axios from 'axios';

const Todo = () => {

    const { state,dispatch} = useContext(TodoContext);
    const { tasks } = state;
   
    const deleteHandler = async (id) => {

        const url = 'api/v1/task/' + id;

        try {

            const confirmed = window.confirm('Are you sure you want to delete this ?');
            if (confirmed) {

                await axios.delete(
                    url,
                    {
                        headers: {
                            Authorization: 'Bearer Q3jc33KrD7zCaLEU8GNu2ZlPoXPoFwgtLF9kH-FwGWycoOM5jg'
                        },
                    }
                );
                dispatch({ type: 'REMOVE_TASKS', payload: id });
                console.log('Item deleted!');
            }
            console.log('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
        }

    }


    return (
        <div className={Classes.todo}>
        <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                    <div>
                        <input type='radio' />
                    </div>
                    <p>{task.title}</p>
                    <Button onClick={() => deleteHandler(task._uuid)} ><DeleteFilled /></Button>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default Todo;

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { TodoContext } from '../store/TodoContext';
import Todo from './Todo';
import { Spin } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';

const TodoList = () => {

    const { state, dispatch } = useContext(TodoContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('api/v1/task', {
                    headers: {
                        Authorization: 'Bearer Q3jc33KrD7zCaLEU8GNu2ZlPoXPoFwgtLF9kH-FwGWycoOM5jg'
                    }
                });
                dispatch({ type: 'SET_TASKS', payload: response.data.items });
                setIsLoading(false)

            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, [dispatch]);


    return (
        <div>
            {isLoading && <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>}

            {!isLoading && state.tasks.length === 0 && <p style={{ fontSize: '20px' }}>
                <FileExcelOutlined style={{ fontSize: '30px' }} /> No Data.
            </p>}

            {!isLoading && state.tasks.length > 0 && <Todo />}

        </div>

    );
};

export default TodoList;

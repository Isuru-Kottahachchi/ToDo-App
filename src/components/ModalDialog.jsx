import React, { useContext, useState } from 'react'
import { Button, Modal } from 'antd';
import Classes from './ModalDialog.module.css'
import { PlusCircleFilled } from '@ant-design/icons';
import { TodoContext } from '../store/TodoContext';
import { Spin } from 'antd';

import axios from 'axios';

const ModalDialog = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const { dispatch } = useContext(TodoContext);
    const [isLoading, setIsLoading] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = async () => {
        setIsLoading(true)

        setIsModalVisible(false);

        console.log({ title })

        try {
            await axios.post(
                'api/v1/task',
                [{ "title": title, "completed": false }],
                {
                    headers: {
                        Authorization: 'Bearer Q3jc33KrD7zCaLEU8GNu2ZlPoXPoFwgtLF9kH-FwGWycoOM5jg'
                    },
                }
            );

            dispatch({ type: 'ADD_TASK', payload: [{ "title": title, "completed": false }] });
            setTitle('');
            setIsLoading(false)
            console.log('Task added successfully!');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div>


            <Button type="primary" onClick={showModal}>
                Add New <PlusCircleFilled />
            </Button>

            <Modal
                title="Add new item"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="confirm" type="primary" onClick={handleOk}>
                        Confirm
                    </Button>,
                ]}
            >
                <p>Title</p>
                <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required className={Classes.inputField} />
            </Modal>
            {isLoading && <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>}

        </div>
    )
}

export default ModalDialog
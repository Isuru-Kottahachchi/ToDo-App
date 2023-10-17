import React from 'react'
import Classes from './Body.module.css'
import ModalDialog from './ModalDialog'


const Body = (props) => {

    return (
        <div >
            <div className={Classes.bodyHeader}>
                <h2 className={Classes.bodyTitle}>To do list</h2>
                <div className={Classes.modalBtn}>
                    <ModalDialog />
                </div>
            </div>
        </div>
    )
}

export default Body
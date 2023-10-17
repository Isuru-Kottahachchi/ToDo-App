import React from 'react'
import Classes from './Header.module.css'
import {AlertTwoTone } from '@ant-design/icons';


const Header = (props) => {
  return (
    <div className={Classes.header}>
        <div className={Classes.title}><AlertTwoTone />ToDo</div></div>
  )
}

export default Header
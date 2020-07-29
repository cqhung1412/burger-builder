import React from 'react'
import logo from '../../../assets/images/burger-logo.png';
import classes from './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => {
  return (
    <header className={classes.ToolbarHeader}>
      <img src={logo} className={classes.ToolbarLogo} alt="logo" />
      <nav>
        <NavigationItems />
      </nav>
      <p>Bear Burger Builder</p>
    </header>
  )
}

export default toolbar

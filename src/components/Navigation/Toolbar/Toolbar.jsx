import React from 'react'
import logo from '../../../assets/images/burger-logo.png';
import classes from './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
  return (
    <header className={classes.ToolbarHeader}>
      <img src={logo} className={classes.ToolbarLogo} alt="logo" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
      <div onClick={props.toggleSideDrawer}>MENU</div>
    </header>
  )
}

export default toolbar

import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItems.css'

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink 
        exact={props.exact}
        to={props.link} 
        activeClassName={classes.active}
      >{props.children}</NavLink>
    </li>
  )
}

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      {/* <NavigationItem link='/' exact>HOME</NavigationItem> */}
      <NavigationItem link='/builder'>BEAR BURGER</NavigationItem>
      <NavigationItem link='/orders'>ORDERS</NavigationItem>
      <NavigationItem link='/qrcode'>QR CODE</NavigationItem>
    </ul>
  )
}

export default navigationItems

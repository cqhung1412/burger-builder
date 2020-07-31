import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItems.css'

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink 
        to={props.link} 
        activeClassName={classes.active}
      >{props.children}</NavLink>
    </li>
  )
}

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/builder'>BEAR BURGER</NavigationItem>
      <NavigationItem link='/checkout'>CHECKOUT</NavigationItem>
    </ul>
  )
}

export default navigationItems

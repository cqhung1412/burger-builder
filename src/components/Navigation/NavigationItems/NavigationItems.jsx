import React from 'react'
import classes from './NavigationItems.css'

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <a 
        href={props.link} 
        className={props.active && classes.active}
      >{props.children}</a>
    </li>
  )
}

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' active>BEAR BURGER</NavigationItem>
      <NavigationItem link='/checkout'>CHECKOUT</NavigationItem>
    </ul>
  )
}

export default navigationItems

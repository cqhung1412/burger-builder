import React, { Component } from 'react'
import classes from './Layout.css'
import Auxiliary from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    isSideDrawerOpen: false
  }

  toggleSideDrawer = () => {
    this.setState({ isSideDrawerOpen: !this.state.isSideDrawerOpen })
  }

  render() {
    return (
      <Auxiliary>
        <SideDrawer 
          open={this.state.isSideDrawerOpen} 
          onClose={this.toggleSideDrawer}
        />
        <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
        <main className={classes.Content}>
          {this.props.children}
        </main> 
      </Auxiliary>
    )
  }
}

export default Layout

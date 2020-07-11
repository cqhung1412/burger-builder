import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'

export default class BurgerBuilder extends Component {
  state = {
    ingredients: [
      'cheese', 'meat', 'bacon', 'salad', 'cheese', 'bacon'
    ]
  }
  render() {
    return (
      <Auxiliary>
        <Burger ingredients={[...this.state.ingredients]}/>
        <div>Build Controller</div>
      </Auxiliary>
    )
  }
}

import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildController from '../../components/Burger/BuildController/BuildController'

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
        <BuildController />
      </Auxiliary>
    )
  }
}

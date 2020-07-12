import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildController from '../../components/Burger/BuildController/BuildController'

export default class BurgerBuilder extends Component {
  state = {
    ingredients: []
  }

  addIngredient = (ing) => {
    this.setState({ ingredients: [...this.state.ingredients, ing] })
  }

  removeIngredient = ing => {
    let ings = [...this.state.ingredients]
    for (let i = ings.length - 1; i >= 0; i--) {
      if(ings[i] === ing) {
        ings.splice(i, 1)
        break
      }
    }
    this.setState({ ingredients: ings })
  }

  render() {
    return (
      <Auxiliary>
        <Burger ingredients={[...this.state.ingredients]}/>
        <BuildController 
          onLess={(ing)=>this.removeIngredient(ing)} 
          onMore={(ing)=>this.addIngredient(ing)}
          ingredients={[...this.state.ingredients]}
        />
      </Auxiliary>
    )
  }
}

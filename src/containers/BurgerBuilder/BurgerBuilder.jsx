import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildController from '../../components/Burger/BuildController/BuildController'

export default class BurgerBuilder extends Component {
  state = {
    ingredients: [],
    totalPrice: 0.0
  }

  componentDidMount() {
    this.setState({ ingredients: [
        // 'bacon', 'cheese', 'meat', 'salad', 'cheese', 'meat'
      ],
      totalPrice: 4.0
    })
  }

  addIngredient = (ing, price) => {
    this.setState({ ingredients: [...this.state.ingredients, ing], totalPrice: this.state.totalPrice + price })
  }

  removeIngredient = (ing, price) => {
    let ings = [...this.state.ingredients]
    for (let i = ings.length - 1; i >= 0; i--) {
      if(ings[i] === ing) {
        ings.splice(i, 1)
        break
      }
    }
    this.setState({ ingredients: ings, totalPrice: this.state.totalPrice - price })
  }

  render() {
    return (
      <Auxiliary>
        <Burger ingredients={[...this.state.ingredients]}/>
        <BuildController 
          onLess={(ing, price)=>this.removeIngredient(ing, price)} 
          onMore={(ing, price)=>this.addIngredient(ing, price)}
          ingredients={[...this.state.ingredients]}
          price={this.state.totalPrice}
        />
      </Auxiliary>
    )
  }
}

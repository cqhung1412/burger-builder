import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildController from '../../components/Burger/BuildController/BuildController'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

export default class BurgerBuilder extends Component {
  state = {
    ingredients: [],
    totalPrice: 0.0,
    purchasable: false,
    isModalOpen: false
  }

  componentDidMount() {
    this.setState({ ingredients: [
        // 'bacon', 'cheese', 'meat', 'salad', 'cheese', 'meat'
      ],
      totalPrice: 4.0
    })
  }

  togglePurchaseState(ings) {
    const ingsArr = ings.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, { 'bacon': 0, 'cheese': 0, 'meat': 0, 'salad': 0 })
    const sum = Object.values(ingsArr).reduce((sum, el) => sum += el, 0)
    this.setState({ purchasable: sum > 1 })
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  addIngredient = (ing, price) => {
    this.setState({ ingredients: [...this.state.ingredients, ing], totalPrice: this.state.totalPrice + price })
    this.togglePurchaseState([...this.state.ingredients, ing])
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
    this.togglePurchaseState(ings)
  }

  render() {
    return (
      <Auxiliary>
        <Modal show={this.state.isModalOpen}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={[...this.state.ingredients]}/>
        <BuildController 
          onLess={(ing, price)=>this.removeIngredient(ing, price)} 
          onMore={(ing, price)=>this.addIngredient(ing, price)}
          onOrder={this.toggleModal}
          ingredients={[...this.state.ingredients]}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Auxiliary>
    )
  }
}

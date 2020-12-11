import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildController from '../../components/Burger/BuildController/BuildController'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0.0,
    isModalOpen: false,
    loading: false
  }
  
  componentDidMount() {
    this.setState({ loading: true })
    axios.get('/ingredients.json')
      .then(res => {
        const ingredientObject = res.data // = { 1:"bacon", 2:"cheese",... }
        const ingredients = Object.values(ingredientObject)
        this.setup(ingredients) 
        this.togglePurchaseState(ingredients)
      })
      .catch(err => console.log(err))
    this.setState({ loading: false })
  }

  setup(ingredients = []) {
    this.setState({
      ingredients: ingredients,
      totalPrice: 4.0,
      purchasable: false,
      isModalOpen: false,
      loading: false
    })
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  addIngredient = (ing, price) => {
    // add one to the bottom
    this.setState({ 
      ingredients: [...this.state.ingredients, ing], 
      totalPrice: this.state.totalPrice + price 
    })
    this.togglePurchaseState([...this.state.ingredients, ing])
  }

  removeIngredient = (ing, price) => {
    let updatedIngredients = [...this.state.ingredients]
    // remove the bottom ingredient
    for (let i = updatedIngredients.length - 1; i >= 0; i--) {
      if(updatedIngredients[i] === ing) {
        updatedIngredients.splice(i, 1)
        break
      }
    }
    this.setState({ 
      ingredients: updatedIngredients, 
      totalPrice: this.state.totalPrice - price 
    })
    this.togglePurchaseState(updatedIngredients)
  }

  purchaseContinueHandler = () => {    
    const queryParams = []
    this.state.ingredients.forEach(ing => {
      queryParams.push(encodeURIComponent(ing))
    })
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    let orderSummary = null
    let burger = <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={[...this.state.ingredients]}/>
          <BuildController 
            onLess={(ing, price)=>this.removeIngredient(ing, price)} 
            onMore={(ing, price)=>this.addIngredient(ing, price)}
            onOrder={this.toggleModal}
            ingredients={[...this.state.ingredients]}
            price={this.state.totalPrice}
          />
        </Auxiliary>
      )
      orderSummary = (
        <OrderSummary 
          ingredients={this.state.ingredients} 
          totalPrice={this.state.totalPrice}
          onCancel={this.toggleModal} 
          onContinue={this.purchaseContinueHandler}
        />
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Auxiliary>
        <Modal 
          show={this.state.isModalOpen}
          onBackdropClick={this.toggleModal}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)

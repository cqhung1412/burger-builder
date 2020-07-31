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
    purchasable: false,
    isModalOpen: false,
    loading: false
  }
  
  componentDidMount() {
    console.log(this.props)
    axios.get('/ingredients.json')
      .then(res => {
        const ingredients = res.data
        const ingArr = Object.keys(ingredients)
        this.setup(ingArr)
        this.togglePurchaseState(ingArr)
      })
      .catch(err => console.log(err))
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

  togglePurchaseState(ings) {
    const ingsObj = ings.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, { 'bacon': 0, 'cheese': 0, 'meat': 0, 'salad': 0 })
    const sum = Object.values(ingsObj).reduce((sum, el) => sum += el, 0)
    this.setState({ purchasable: sum > 1 })
  }

  toggleModal = () => {
    this.setState({isModalOpen: !this.state.isModalOpen })
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

  purchaseContinueHandler = () => {
    // this.setState({ loading: true })
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice, // Shouldn't use in a real app
    //   customer: {
    //     name: 'Hùng Gấu',
    //     address: {
    //       street: '23 PVD',
    //       ward: 'HBC',
    //       district: 'TD',
    //       city: 'HCM'
    //     },
    //     phone: '0903074656'
    //   },
    //   deliveryMethod: 'express'
    // }
    // axios.post('/orders.json', order)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // this.setup()
    this.props.history.push('/checkout')
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
            purchasable={this.state.purchasable}
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

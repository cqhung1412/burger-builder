import React, { Component } from 'react'
import { connect } from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildController from '../../components/Burger/BuildController/BuildController'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'
import * as actionTypes from '../../store/actions'

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
      .then(res => Object.values(res.data)) // = { 1:"bacon", 2:"cheese",... }
      .then(ingredients => this.setup(ingredients))
      .catch(err => console.log(err))
  }

  setup(ingredients = []) {
    this.setState({
      ingredients: ingredients,
      totalPrice: 4.0,
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
      ingredients: [...this.props.ingredients, ing], 
      totalPrice: this.props.totalPrice + price 
    })
  }

  removeIngredient = (ing, price) => {
    let updatedIngredients = [...this.props.ingredients]
    // remove the bottom ingredient
    for (let i = updatedIngredients.length - 1; i >= 0; i--) {
      if(updatedIngredients[i] === ing) {
        updatedIngredients.splice(i, 1)
        break
      }
    }
    this.setState({ 
      ingredients: [...updatedIngredients], 
      totalPrice: this.props.totalPrice - price 
    })
  }

  purchaseContinueHandler = () => {    
    const queryParams = []
    this.props.ingredients.forEach(ing => {
      queryParams.push(encodeURIComponent(ing))
    })
    queryParams.push('price=' + this.props.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    let orderSummary = null
    let burger = <Spinner />

    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={[...this.props.ingredients]}/>
          <BuildController 
            onLess={(ing, price)=>this.props.onIngredientRemoved(ing, price)} 
            onMore={(ing, price)=>this.props.onIngredientAdded(ing, price)}
            onOrder={this.toggleModal}
            ingredients={[...this.props.ingredients]}
            price={this.props.totalPrice}
          />
        </Auxiliary>
      )
      orderSummary = (
        <OrderSummary 
          ingredients={this.props.ingredients} 
          totalPrice={this.props.totalPrice}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredient, price) => dispatch({
      type: actionTypes.ADD_INGREDIENTS,
      payload: { ingredient, price }
    }),
    onIngredientRemoved: (ingredient, price) => dispatch({
      type: actionTypes.REMOVE_INGREDIENTS,
      payload: { ingredient, price }
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))

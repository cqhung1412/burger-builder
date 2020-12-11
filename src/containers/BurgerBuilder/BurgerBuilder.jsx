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
    isModalOpen: false,
    loading: false
  }
  
  componentDidMount() {
    this.setState({ loading: true })
    axios.get('/ingredients.json')
      .then(res => Object.values(res.data)) // = { 1:"bacon", 2:"cheese",... }
      .then(ingredients => {
        axios.get('/price.json')
          .then(res => {
            const ingredientPrice = res.data // = { bacon: 0.30, cheese: 0.50,... }
            this.props.onComponentDidMount(ingredients, ingredientPrice)
          })
          .catch(err => console.log(err))
      })
      .then(() => this.setState({ loading: false }))
      .catch(err => console.log(err))
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
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
    const { isModalOpen, loading } = this.state
    const { 
      ingredients, 
      totalPrice, 
      ingredientPrice, 
      onIngredientAdded, 
      onIngredientRemoved 
    } = this.props

    let orderSummary = null
    let burger = <Spinner />

    if (ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={[...ingredients]}/>
          <BuildController 
            onLess={(ing)=>onIngredientRemoved(ing)} 
            onMore={(ing)=>onIngredientAdded(ing)}
            onOrder={this.toggleModal}
            ingredients={[...ingredients]}
            totalPrice={totalPrice}
            ingredientPrice={{...ingredientPrice}}
          />
        </Auxiliary>
      )
      orderSummary = (
        <OrderSummary 
          ingredients={ingredients} 
          totalPrice={totalPrice}
          onCancel={this.toggleModal} 
          onContinue={this.purchaseContinueHandler}
        />
      )
    }

    if (loading) {  orderSummary = <Spinner /> }

    return (
      <Auxiliary>
        <Modal 
          show={isModalOpen}
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
    totalPrice: state.totalPrice,
    ingredientPrice: state.ingredientPrice
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: (ingredients, ingredientPrice) => dispatch({
      type: actionTypes.SETUP,
      payload: { ingredients, ingredientPrice }
    }),
    onIngredientAdded: (ingredient) => dispatch({
      type: actionTypes.ADD_INGREDIENTS,
      payload: { ingredient }
    }),
    onIngredientRemoved: (ingredient) => dispatch({
      type: actionTypes.REMOVE_INGREDIENTS,
      payload: { ingredient }
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))

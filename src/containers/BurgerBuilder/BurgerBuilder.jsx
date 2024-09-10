import React, { Component } from 'react'
import { connect } from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildController from '../../components/Burger/BuildController/BuildController'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-instance'
import * as actionCreators from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    isModalOpen: false,
    loading: false
  }
  
  componentDidMount() {
    this.setState({ loading: true })
    this.props.onComponentDidMount()
    this.setState({ loading: false })
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  purchaseContinueHandler = () => {    
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render() {
    const { isModalOpen, loading } = this.state
    const { 
      ingredients, 
      totalPrice, 
      ingredientPrice, 
      onIngredientAdded, 
      onIngredientRemoved ,
      error
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
    if (error) { burger = <p>Ingredients cannot be loaded D:</p> }

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
  const { ingredients, totalPrice, ingredientPrice, error } = state.builder
  return {
    ingredients,
    totalPrice,
    ingredientPrice,
    error
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: () => dispatch(actionCreators.initIngredients()),
    onIngredientAdded: (ingredient) => dispatch(actionCreators.addIngredient({ingredient})),
    onIngredientRemoved: (ingredient) => dispatch(actionCreators.removeIngredient({ingredient})),
    onInitPurchase: () => dispatch(actionCreators.initPurchase())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))

import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  const { ingredients } = props

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingredients.map((_, index) => (
        <BurgerIngredient key={index} type={_}/>
      ))}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default burger

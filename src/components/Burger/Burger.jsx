import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  const { ingredients } = props

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingredients.map((type, index) => (
        <BurgerIngredient key={index} type={type}/>
      ))}
      {ingredients.length < 1 && <p>Let's start adding ingredients :D</p>}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default burger

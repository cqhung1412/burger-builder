import React from 'react'
import classes from './BuildController.css'

const BuildElement = props => (
  <div className={classes.BuildElement}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less}>Less</button>
    <button className={classes.More}>More</button>
  </div>
)

const buildController = () => {
  const labels = [ 'Meat', 'Bacon', 'Cheese', 'Salad' ]
  return (
    <div className={classes.BuildController}>
      {labels.map((label, index) => (
        <BuildElement key={index} label={label}/>
      ))}
    </div>
  )
}

export default buildController

import React from 'react'
import Burger from '../Burger/Burger'

const Order = (props) => {
  return (
    <div>
      <div style={{width:'100%', margin:'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
    </div>
  )
}

export default Order

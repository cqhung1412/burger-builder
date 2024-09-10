import React, { Fragment } from 'react'

import classes from './IngredientSummary.css'

const ingredientSummary = (props) => {
    const { ingredients } = props

    const ingsArr = ingredients.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1
        return prev
    }, { 'bacon': 0, 'cheese': 0, 'meat': 0, 'salad': 0 })

    return (
        <Fragment>
            {
                Object.keys(ingsArr)
                    .filter(ing => ingsArr[ing] !== 0)
                    .map(ing =>
                        <div className={classes.IngredientName} key={ing}>
                            {ing} ({ingsArr[ing]})
                        </div>
                    )
            }
        </Fragment>
    )
}

export default ingredientSummary

import React from 'react'

const ingredientSummary = (props) => {
    const { ingredients } = props

    const ingsArr = ingredients.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1
        return prev
    }, { 'bacon': 0, 'cheese': 0, 'meat': 0, 'salad': 0 })

    return (
        <ul>
            {
                Object.keys(ingsArr)
                    .filter(ing => ingsArr[ing] !== 0)
                    .map(ing =>
                        <li key={ing}><strong style={{ textTransform: 'capitalize' }}>{ing}</strong>: {ingsArr[ing]}</li>
                    )
            }
        </ul>
    )
}

export default ingredientSummary

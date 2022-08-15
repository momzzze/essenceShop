import React from 'react'
import './cartStyle.js'
const CartProduct = ({
    cartProduct,
    onAdd
}) => {

    return (
        <>
            <div>
                <img className='small' src={cartProduct.imageUrl} alt={cartProduct.name} />
                <h3>{cartProduct.name}</h3>
                <div>{cartProduct.price}</div>
            </div>
            <div>
                <button onClick={() => onAdd(cartProduct)}>Add To Cart</button>
            </div>
        </>
    )
}

export default CartProduct
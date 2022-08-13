import React from 'react'
import './cartStyle.js'
const CartProduct = ({
    product,
    onAdd
}) => {

    return (
        <>
            <div>
                <img className='small' src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <div>{product.price}</div>
            </div>
            <div>
                <button onClick={()=> onAdd(product)}>Add To Cart</button>
            </div>
        </>
    )
}

export default CartProduct
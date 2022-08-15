import React from 'react'
import CartProduct from './CartProduct'

const CartProducts = ({
    cartProducts
}) => {
    return (
        <div>
            {cartProducts.map((prod) => (
                <CartProduct key={prod.id} cartProduct={prod} />
            ))}
        </div>
    )
}

export default CartProducts
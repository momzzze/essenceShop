import React from 'react'
import CartProduct from './CartProduct'

export const Main = (props) => {
    const { products, onAdd } = props
    return (
        <main className="block col-5">
            <h2>Products</h2>
            <div className="row">
                {products.map((product) => (
                    <CartProduct key={product.id} product={product} onAdd={onAdd}/>
                ))}
            </div>
        </main>
    )
}

import { Grid } from '@material-ui/core'
import React from 'react'
import CartProduct from './CartProduct'

const CartProducts = ({
    cartProducts
}) => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-10 col-11 mx-auto'>
                    <div className='row mt-5 gx-3'>
                        {/* left side div */}
                        <div className='col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow'>
                            <div className='card p-4'>
                                <h2 className='py-4'>Cart({cartProducts.length})</h2>
                                {cartProducts.map((prod) => (
                                    <CartProduct key={prod.id} cartProduct={prod} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    )
}

export default CartProducts
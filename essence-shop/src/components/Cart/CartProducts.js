import { Button, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useState } from 'react'
import CartProduct from './CartProduct'
import useStyles from './cartStyle';

const CartProducts = ({
    cartProducts,
    cartProductIncrease,
    cartProductDecrease,
    productPriceAmount,
    totalAmount,
    removeProduct,
    checkoutLogic
}) => {
    const classes = useStyles();
    
    const checkoutLogicHandler=()=>{
        checkoutLogic(cartProducts)
    }

    return (
        <div>
            {cartProducts?.length > 0 && (
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-10 col-11 mx-auto'>
                            <div className='row mt-5 gx-3'>
                                {/* left side div */}
                                <div className='col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5 shadow'>
                                    <div className='card p-4'>
                                        <h2 className='py-4'>Cart({cartProducts.length})</h2>
                                        {cartProducts.map((prod) => (
                                            <CartProduct
                                                key={prod.id}
                                                cartProduct={prod}
                                                cartProductIncrease={cartProductIncrease}
                                                cartProductDecrease={cartProductDecrease}
                                                removeProduct={removeProduct}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5'>
                                    <div className='p-3 shadow bg-white'>
                                        <h2 className='product_name mb-5'>The Total Amount of</h2>
                                        <div className='price_individual d-flex justify-content-between'>
                                            <p>Products amount</p>
                                            <p>$<span>{productPriceAmount}</span></p>
                                        </div>
                                        <div className='price_individual d-flex justify-content-between'>
                                            <p>Shiping Charge</p>
                                            <p>$<span>20.0</span></p>
                                        </div>
                                        <hr />
                                        <div className='price_individual d-flex justify-content-between font-weight-bold'>
                                            <p>Total Price</p>
                                            <p>$<span>{totalAmount}</span></p>
                                        </div>
                                        <Button onClick={checkoutLogicHandler} className={classes.buttonCheck}>Checkout</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {cartProducts?.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            )}
        </div>
    )
}

export default CartProducts
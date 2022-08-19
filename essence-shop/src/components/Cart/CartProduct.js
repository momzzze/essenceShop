
import useStyles from './cartStyle';
import React from 'react'
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';
import { minus } from 'react-icons-kit/feather/minus';
import { Button } from '@material-ui/core';

const CartProduct = ({
    cartProduct,
    cartProductIncrease,
    cartProductDecrease,
    removeProduct
}) => {
    const classes = useStyles();
    const decrementHandler = () => {
        cartProductDecrease(cartProduct);
    }
    const incrementHandler = () => {
        cartProductIncrease(cartProduct);
    }
    const removeItemFromCart=()=>{
        removeProduct(cartProduct);
    }

    return (

        <div className='row'>
            {/* cart images div */}
            <div className='col-md-4 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img'>
                <img src={cartProduct?.imageUrl} className='img-fluid' alt={cartProduct?.name} />
            </div>
            {/* cart product details */}
            <div className='col-md-6 col-11 mx-auto px-2 mt-3'>
                <div className='row'>
                    {/* product name */}
                    <div className='col-6  title'>
                        <h1 className='mb-4 product_name'>{cartProduct?.name}</h1>
                    </div>
                    {/* quantity inc dec  */}
                    <div className='col-6 justify-content-end' >
                        <ul className='pagination'>
                            <li className='page-item'>
                                <div className='product-text quantity-box'>
                                    <Button onClick={decrementHandler}><Icon icon={minus} size={20} /></Button>
                                </div>
                            </li>
                            <li className='page-item'>
                                <div className='page-link'>{cartProduct.qty}</div>
                            </li>
                            <li className='page-item'>
                                <div className='product-text quantity-box'>
                                    <Button onClick={incrementHandler}><Icon icon={plus} size={20} /></Button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* remove and price  */}
                <div className='row'>
                    <div className='col-8 d-flex justify-content-between remove_wish'>
                        <h4><Button onClick={removeItemFromCart} className={classes.buttonCheck}>Remove Item</Button></h4>
                    </div>
                    <div className='col-4 d-flex justify-content-end'>
                        <h3> ${cartProduct.price}</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 d-flex justify-content-between remove_wish'>
                        <h4>Total Product Amount: </h4>
                    </div>
                    <div className='col-4 d-flex justify-content-end'>
                        <h3> ${cartProduct.TotalProductPrice}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct





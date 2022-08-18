
import useStyles from './cartStyle';
import React from 'react'
import './cartStyle.js'
import { Icon } from '@material-ui/core';
const CartProduct = ({
    cartProduct,
    onAdd
}) => {
    const classes = useStyles();
    const decreaseProductQty = () => {
        console.log('-');
    }
    const incrementProductQty = () => {
        console.log('+');
    }
    return (

        <div className='row'>
            {/* cart images div */}
            <div className='col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img'>
                <img src={cartProduct?.imageUrl} className='img-fluid' alt={cartProduct?.name} />
            </div>
            {/* cart product details */}
            <div className='col-md-7 col-11 mx-auto px-4 mt-2'>
                <div className='row'>
                    {/* product name */}
                    <div className='col-6  title'>
                        <h1 className='mb-4 product_name'>{cartProduct?.name}</h1>
                    </div>
                    {/* quantity inc dec  */}
                    <div className='col-6 justify-content-end ' >
                        <ul className='pagination'>
                            <li className='page-item'>
                                <button className='page-link' onClick={decreaseProductQty}>-</button>
                            </li>
                            <li className='page-item'>
                                <button className='page-link' value='1' id='textbox'>{cartProduct.qty}</button>
                            </li>
                            <li className='page-item'>
                                <button className='page-link' onClick={incrementProductQty}>+</button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* remove and price  */}
                <div className='row'>
                    <div className='col-8 d-flex justify-content-between remove_wish'>
                        <h4><i className="fa fa-trash"></i>Remove Item</h4>                        
                    </div>
                    <div className='col-4 d-flex justify-content-end'>
                        <h3> ${cartProduct.price}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct





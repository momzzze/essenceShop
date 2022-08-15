import { onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../../contexts/ProductContext'
import { cartCollectionRef } from '../../lib/firestore.collections'
import CartProduct from './CartProduct'
import { useState } from 'react';
import { Main } from './Main';
import { Drawer, LinearProgress, Grid, Badge, Button } from '@material-ui/core';
import useStyles from './cartStyle.js';
import { AddShoppingCart } from '@material-ui/icons'
import { deleteUserCart, getCartByUserId } from '../../lib/firebase.fetch'
import { auth } from '../../lib/init-firebase'
import CartProducts from './CartProducts'

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const {badgerCalculator}=useContext(ProductContext);
    let prodCart = [];
    
   

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                getCartByUserId(user.uid).then((doc) => {
                    setCartProducts(doc);
                })
            } else {
                console.log('User is not signed in to retrieve cart');
            }
        })
    }, [])


    return (
        <>
            {console.log(cartProducts)}
            {cartProducts.length > 0 && (
                <div>
                    <h1>Cart: </h1>
                    <div>
                        <CartProducts cartProducts={cartProducts}/>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div>No products to show</div>
            )}
        </>
    )
}

export default Cart
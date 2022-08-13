import { onSnapshot } from 'firebase/firestore'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../../contexts/ProductContext'
import { cartCollectionRef } from '../../lib/firestore.collections'
import CartProduct from './CartProduct'
import { useState } from 'react';
import { Main } from './Main';
import { Drawer, LinearProgress, Grid, Badge, Button } from '@material-ui/core';
import useStyles from './cartStyle.js';
import { AddShoppingCart } from '@material-ui/icons'
import { deleteUserCart } from '../../lib/firebase.fetch'

const Cart = () => {    
    const { userData } = useContext(ProductContext);
    
    const click = () => {
        { console.log(userData[0].cart) }
    }
    const click1 = () => {  
            deleteUserCart(userData[0].id);        
    }
    return (
        <div>
            <button onClick={click}>+</button>
            <button onClick={click1}>-</button>
        </div>
    )
}

export default Cart
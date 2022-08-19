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
import { deleteItemFromCart, deleteUserCart, editCart, getCartByUserId } from '../../lib/firebase.fetch'
import { auth } from '../../lib/init-firebase'
import CartProducts from './CartProducts'

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const { badgerCalculator } = useContext(ProductContext);
    const [product, setProduct] = useState({});
    let Product;
    const [totalAmount, setTotalAmount] = useState(0);
    const [productPriceAmount, setProductPriceAmount] = useState(0);
    useEffect(() => {
        setTotalAmount(0)
        setProductPriceAmount(0);
        cartProducts.forEach(element => {
            setProductPriceAmount(old => old += element.TotalProductPrice);
        });
        setTotalAmount(productPriceAmount + 20.0);
    }, [product, cartProducts, productPriceAmount])

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
        badgerCalculator();
    }, [product])


    //cart product increase amount function
    const cartProductIncrease = (cartProduct) => {
        // set global value for the product
        Product = cartProduct;
        if (Product.qty <= Product.inStock) {
            Product.qty = Product.qty + 1;
            Product.TotalProductPrice = Product.qty * Product.price;
            setProduct(Product);
            //update DB for the product changes
            auth.onAuthStateChanged(user => {
                if (user) {
                    getCartByUserId(user.uid).then(
                        editCart(user.uid, Product.productId, Product)
                    )
                } else {
                    console.log('User is not signed in to retrieve cart');
                }
            })
        }
    }
    const removeProduct = (cartProduct) => {
        deleteItemFromCart(auth.currentUser.uid, cartProduct.productId);
        auth.onAuthStateChanged(user => {
            if (user) {
                getCartByUserId(user.uid).then((doc) => {
                    setCartProducts(doc);
                })
            } else {
                console.log('User is not signed in to retrieve cart');
            }
        })
    }
    // cart product decrease amount function
    const cartProductDecrease = (cartProduct) => {
        // set global value for the product
        Product = cartProduct;
        if (Product.qty > 1) {
            Product.qty = Product.qty - 1;
            Product.TotalProductPrice = Product.qty * Product.price;
            setProduct(Product);
            //update DB for the product changes
            auth.onAuthStateChanged(user => {
                if (user) {
                    getCartByUserId(user.uid).then(
                        editCart(user.uid, Product.productId, Product)
                    )
                } else {
                    console.log('User is not signed in to retrieve cart');
                }
            })
        }
    }

    return (
        <>

            {cartProducts.length > 0 && (
                <div>
                    <div>
                        <CartProducts
                            cartProducts={cartProducts}
                            cartProductIncrease={cartProductIncrease}
                            cartProductDecrease={cartProductDecrease}
                            totalAmount={totalAmount}
                            productPriceAmount={productPriceAmount}
                            removeProduct={removeProduct}
                        />
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
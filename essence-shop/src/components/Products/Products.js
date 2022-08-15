import React, { useState } from 'react'
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './productsStyle';
import { productCollectionRef } from '../../lib/firestore.collections';
import { getDoc, getDocs, QuerySnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import db, { auth } from '../../lib/init-firebase';
import { ProductContext } from '../../contexts/ProductContext';
import { useContext } from 'react';
import { editUser } from '../../lib/firebase.fetch';




const Products = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setProducts([]);
        const docs = getDocs(productCollectionRef).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                setProducts((oldState) => [...oldState, { ...doc.data(), id: doc.id }])
            })
        })
    }
    

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>

                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={12} md={8} lg={4}>
                        <Product product={product} id={product.id} />
                    </Grid>
                ))}
            </Grid>            
        </main>
    )
}

export default Products
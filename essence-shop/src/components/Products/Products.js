import React, { useState } from 'react'
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './productsStyle';
import { productCollectionRef } from '../../lib/firestore.collections';
import { getDoc, getDocs, QuerySnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import db from '../../lib/init-firebase';




const Products = ({ products }) => {
    const classes = useStyles();


    const clickedBtn = () => {
        products.forEach(product => {
            console.log(product);
        });
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
            <button onClick={clickedBtn}>Click</button>
        </main>
    )
}

export default Products
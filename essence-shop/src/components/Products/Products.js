import React, { useState } from 'react'
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './productsStyle';
import { productCollectionRef } from '../../lib/firestore.collections';
import { getDoc, getDocs, QuerySnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import db from '../../lib/init-firebase';


const productsDB = [
    { id: 1, name: 'Picture', description: 'Some Picture', price: '$5', imageUrl: 'https://i.etsystatic.com/13123392/r/il/8c6f2f/3718797167/il_794xN.3718797167_ofvy.jpg' },
    { id: 2, name: 'Picture2', description: 'Some Picture 2', price: '$15', imageUrl: 'https://i.etsystatic.com/24098352/r/il/17d99c/2450997257/il_794xN.2450997257_rsbk.jpg' },
    { id: 3, name: 'Picture 3', description: 'Some Picture 3', price: '$10', imageUrl: 'https://i.etsystatic.com/34854089/r/il/fff0c6/3824682789/il_794xN.3824682789_j2lr.jpg' },

]

const Products = ({products}) => {
    const classes = useStyles();
   

    // const getProducts = () => {
    //     getDocs(productCollectionRef)
    //         .then(res => {
    // const products = res.docs.map(doc => ({
    //     data: doc.data(),
    //     id: doc.id
    // }));
    // setProducts(products)
    //         }).catch(error => console.log(error.message));

    // }

    const clickedBtn = () => {
        products.forEach(product => {
            console.log(product.data);
        });
    }

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>                        
                        <Product product={product.data} id={product.id} />
                    </Grid>
                ))}
            </Grid>
            <button onClick={clickedBtn}>Click</button>
        </main>
    )
}

export default Products
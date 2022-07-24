import React from 'react'
import { Grid } from '@material-ui/core';


import Product from './Product/Product';
import useStyles from './productsStyle';

const productsDB = [

    { _id: 1, name: 'Picture', description: 'Some Picture', price: '$5', imageUrl: 'https://i.etsystatic.com/13123392/r/il/8c6f2f/3718797167/il_794xN.3718797167_ofvy.jpg' },
    { _id: 2, name: 'Picture2', description: 'Some Picture 2', price: '$15', imageUrl: 'https://i.etsystatic.com/24098352/r/il/17d99c/2450997257/il_794xN.2450997257_rsbk.jpg' },
    { _id: 3, name: 'Picture 3', description: 'Some Picture 3', price: '$10', imageUrl: 'https://i.etsystatic.com/34854089/r/il/fff0c6/3824682789/il_794xN.3824682789_j2lr.jpg' },

]


const Products = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {productsDB.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
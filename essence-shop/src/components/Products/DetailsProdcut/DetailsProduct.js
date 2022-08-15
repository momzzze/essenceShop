import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import useStyles from './detailsProductStyle';
import { Card, CardActionArea, CardActions, CardMedia, CardContent, Button, Typography, Grid, Paper, styled, ButtonBase, Box, CardHeader, IconButton } from '@material-ui/core';
import { async } from '@firebase/util';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../lib/init-firebase';
import { getProductById } from '../../../lib/firebase.fetch';
import { ShoppingBasket } from '@material-ui/icons';
import { theme } from '../../../theme';
import { deleteProduct } from '../../../lib/firebase.fetch';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../contexts/ProductContext';
import { useEffect, useContext } from 'react';


const DetailsProduct = () => {
  const classes = useStyles();
  const redirect = useNavigate();
  const { productId } = useParams();
  const [error, setError] = useState("");
  const [prod, setprod] = useState({});
  // const [cart, setCart] = useState([]);


  useEffect(() => {
    getProductById(productId).then((res) => {
      setprod(res);
    });
  }, [setprod]);


  const product = prod.data;
  const editUrl = `/product/edit/${productId}`;

  const deleteProducts = () => {
    deleteProduct(productId);
    redirect('/product/list');
  }


  return (
    <>
      <Box display='flex' alignContent='center' justifyContent="center">
        <Grid direction='row'
          justifyContent="center"
          container
        >
          <Grid item xs={12} md={8} lg={5}>
            <CardMedia
              component="img"
              alt="product image"
              height="600px"
              image={product?.imageUrl}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={5}>
            <Grid item container direction='column' >
              <Grid item>
                <CardContent>
                  <Grid container >
                    <Grid item >
                      <Typography gutterBottom variant="h2" align='center' component="div">
                        {product?.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" align='left' component="div">
                        By: {product?.author}
                      </Typography>
                    </Grid>
                    <Grid item
                      container
                      direction="column"
                      alignItems="flex-end">
                      <CardActions >
                        <Button size='large' color='secondary' onClick={() => redirect('/product/list')}>Back</Button>
                      </CardActions>
                    </Grid>
                  </Grid>
                  <Typography variant="h4" align='right'>
                    {`${product?.price}$`}
                  </Typography>
                  <Typography variant="body1" align='left'>
                    {product?.description}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item
                container
                direction="column"
                alignItems="flex-end">
                {(auth.currentUser?.uid === product?.seller) &&
                  <CardActions>
                    <Button component={Link} className={classes.buttonGreen} to={editUrl} size='large'>Edit</Button>
                    <Button className={classes.buttonErr} onClick={deleteProducts} size='large'>Delete</Button>
                  </CardActions>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>

  )
}

export default DetailsProduct
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, ListItem, ListItemText, Button } from "@material-ui/core";
import { Stack } from '@mui/material';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './productStyle';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../../contexts/ProductContext';
import { auth } from '../../../lib/init-firebase';

const Product = ({ product, id }) => {
    const redirect = useNavigate();
    const { addToCart } = useContext(ProductContext);
    const prod = product
    const classes = useStyles();

    const handleAddToCart = () => {
        if (auth.currentUser) {
            addToCart(product);
        } else {
            redirect('/login');
        }
    }


    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product?.imageUrl} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5'>
                        {product.price}
                    </Typography>
                </div>
                {/* <Typography variant='body2' color='textSecondary'>
                    {product.description}
                </Typography> */}
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Stack spacing={1} direction='row' m={1}>
                    <Button>
                        <Link to={`/product/${id}`} className={classes.link} variant='secondary' color='primary'>
                            Details
                        </Link>
                    </Button>

                </Stack>
                {(prod.inStock > 0) &&
                    <IconButton aria-label="Add to cart" onClick={handleAddToCart}>
                        <AddShoppingCart />
                    </IconButton>
                }
            </CardActions>
        </Card >
    )
}

export default Product
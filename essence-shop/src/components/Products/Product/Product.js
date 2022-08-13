import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, ListItem, ListItemText, Button } from "@material-ui/core";
import { Stack } from '@mui/material';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './productStyle';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../../contexts/ProductContext';

const Product = ({ product, id }) => {
    const { addToCart } = useContext(ProductContext);
    const prod = product
    const classes = useStyles();

    const handleAddToCart = () => {
        addToCart(product);
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

                <IconButton aria-label="Add to cart" onClick={handleAddToCart}>
                    <AddShoppingCart />
                </IconButton>

            </CardActions>
        </Card >
    )
}

export default Product
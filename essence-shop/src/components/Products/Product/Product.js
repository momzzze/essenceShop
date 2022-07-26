import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, ListItem, ListItemText } from "@material-ui/core";
import { Stack } from '@mui/material';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './productStyle';
import { Link } from 'react-router-dom';

const Product = ({ product, id }) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.imageUrl} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5'>
                        {product.price}
                    </Typography>
                </div>
                <Typography variant='body2' color='textSecondary'>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Stack spacing={1} direction='row' m={1}>
                    <Link to={`/product/${id}`} product={product} id={id} className={classes.link} variant='secondary' color='primary'>
                        <ListItem button>
                            <ListItemText color='primary'>
                                Details
                            </ListItemText>
                        </ListItem>
                    </Link>
                </Stack>
                <IconButton aria-label="Add to cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card >
    )
}

export default Product
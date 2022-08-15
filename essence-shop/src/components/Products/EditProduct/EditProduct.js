import { Button, Grid, List, Paper, TextField } from '@material-ui/core';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { editProduct, getProductById } from '../../../lib/firebase.fetch';
import { db } from '../../../lib/init-firebase';
import { useNavigate } from 'react-router-dom';
import useStyles from './editProductStyle';
import { ProductContext } from '../../../contexts/ProductContext';
import { useContext } from 'react';

const EditProduct = () => {
    const classes = useStyles();
    const { productId } = useParams();
    const navigate = useNavigate();
    const [prod, setprod] = useState({});
    const [name, setname] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [author, setAuthor] = useState('');
    const {getProducts}=useContext(ProductContext);

    useEffect(() => {
        getProductById(productId).then((res) => {
            setprod(res);
            if (res !== {}) {
                setname(res.data.name);
                setAuthor(res.data.author);
                setImageUrl(res.data.imageUrl);
                setPrice(res.data.price);
                setDescription(res.data.description);
            }
        })

    }, [setprod,]);


    const editProductHandler = (e) => {
        e.preventDefault();
        editProduct(productId, {
            ...prod.data,
            name: name,
            author: author,
            description: description,
            imageUrl: imageUrl,
            price: price,
        });        
        navigate(`/product/${productId}`);
    }

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormValues({
    //         ...formValues,
    //         [name]: value,
    //     });
    // };

    return (
        <>
            <form onSubmit={editProductHandler}>
                <Paper elevation={10} className={classes.paperStyle}>
                    <Grid container alignItems="center" justifyContent="center" direction="column" spacing={2}>
                        <h2>Edit Product</h2>

                        <Grid item>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="author"
                                name="author"
                                label="Author"
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="imageUrl"
                                name="imageUrl"
                                label="ImageUrl"
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="price"
                                name="price"
                                label="Price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="description"
                                name='description'
                                label="Description"
                                multiline
                                minRows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Button
                            className={classes.button}
                            variant='contained'
                            type='submit'
                            color='primary'
                            fullWidth
                        >
                            Edit
                        </Button>
                        <Button
                            className={classes.button}
                            variant='contained'
                            onClick={() => navigate(`/product/${prod.id}`)}
                            color='primary'
                            fullWidth
                        >
                            Back
                        </Button>
                    </Grid>
                </Paper>
            </form>
        </>
    )
}

export default EditProduct
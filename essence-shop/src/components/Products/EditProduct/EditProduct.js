import { Button, Grid, List, Paper, TextField } from '@material-ui/core';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { editProduct, getProductById } from '../../../lib/firebase.fetch';
import { auth, db } from '../../../lib/init-firebase';
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
    const { getProducts } = useContext(ProductContext);

    const [nameHelper, setNameHelper] = useState('')
    const [authorHelper, setAuthorHelper] = useState('')
    const [priceHelper, setPriceHelper] = useState('')
    const [descriptionHelper, setDescriptionHelper] = useState('')
    const [imageUrlHelper, setImageUrlHelper] = useState('')


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
    const onChange = event => {
        let valid;
        switch (event.target.id) {
            case "name":
                setname(event.target.value)
                valid = /^(?!\s*$).+/.test(
                    event.target.value
                );

                if (!valid) {
                    setNameHelper("Name is required");
                } else {
                    setNameHelper("");
                }
                break;
            case "description":
                setDescription(event.target.value)
                valid = /^(?!\s*$).+/.test(
                    event.target.value
                );

                if (!valid) {
                    setDescriptionHelper("Description is required");
                } else {
                    setDescriptionHelper("");
                }
                break;
            case "author":
                setAuthor(event.target.value);
                valid = /^(?!\s*$).+/.test(
                    event.target.value
                );

                if (!valid) {
                    setAuthorHelper("Author is required");
                } else {
                    setAuthorHelper("");
                }
                break;
            case "price":
                setPrice(event.target.value);
                valid = /[1-9]+/.test(
                    event.target.value
                );
                if (!valid) {
                    setPriceHelper("Price should be fixed");
                } else {
                    setPriceHelper("");
                }
                break;
            case "imageUrl":
                setImageUrl(event.target.value);
                valid = /[^\s]+/.test(
                    event.target.value
                );

                if (!valid) {
                    setImageUrlHelper("Image should be a valid url");
                } else {
                    setImageUrlHelper("");
                }
                break;

            default:
                break;
        }
    }

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
            {auth.currentUser &&
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
                                    error={nameHelper.length !== 0}
                                    helperText={nameHelper}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="author"
                                    name="author"
                                    label="Author"
                                    type="text"
                                    value={author}
                                    error={authorHelper.length !== 0}
                                    helperText={authorHelper}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="imageUrl"
                                    name="imageUrl"
                                    label="ImageUrl"
                                    type="text"
                                    value={imageUrl}
                                    error={imageUrlHelper.length !== 0}
                                    helperText={imageUrlHelper}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="price"
                                    name="price"
                                    label="Price"
                                    type="number"
                                    value={price}
                                    error={priceHelper.length !== 0}
                                    helperText={priceHelper}
                                    onChange={onChange}
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
                                    error={descriptionHelper.length !== 0}
                                    helperText={descriptionHelper}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Button
                                className={classes.button}
                                variant='contained'
                                type='submit'
                                color='primary'
                                fullWidth
                                disabled={
                                    name.length === 0 ||
                                    author.length === 0 ||
                                    description.length === 0 ||
                                    imageUrl.length === 0 ||
                                    price === 0 || nameHelper.length !== 0 ||
                                    authorHelper.length !== 0 || descriptionHelper.length !== 0 ||
                                    imageUrlHelper.length !== 0 || priceHelper.length !== 0
                                }
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
            }
        </>
    )
}

export default EditProduct
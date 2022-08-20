import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './createProductStyle';
import { serverTimestamp } from 'firebase/firestore';
import { auth } from '../../../lib/init-firebase';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../lib/firebase.fetch';



const CreateProduct = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
        author: "",
    });
    const [error, setError] = useState('');
    const classes = useStyles();
    const navigate = useNavigate();

    const [nameHelper, setNameHelper] = useState('')
    const [authorHelper, setAuthorHelper] = useState('')
    const [priceHelper, setPriceHelper] = useState('')
    const [descriptionHelper, setDescriptionHelper] = useState('')
    const [imageUrlHelper, setImageUrlHelper] = useState('')

    const onChange = event => {
        let valid;
        switch (event.target.id) {
            case "name":
                handleInputChange(event);
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
                handleInputChange(event);
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
                handleInputChange(event);
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
                handleInputChange(event);
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
                handleInputChange(event);
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };


    const createProductHandler = (e) => {
        e.preventDefault();
        const seller = auth.currentUser.uid;
        createProduct({
            name: formValues.name,
            author: formValues.author,
            description: formValues.description,
            imageUrl: formValues.imageUrl,
            price: formValues.price,
            createdAt: serverTimestamp(),
            inStock: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
            fastDelivery: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
            ratings: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
            seller
        }).then(res => {
            if (res) {
                setError(res);
            } else {
                navigate('/product/list', { replace: true })
            }
        })
    }

    return (
        <>
            {
                auth.currentUser &&
                <form onSubmit={createProductHandler}>
                    <Paper elevation={10} className={classes.paperStyle}>
                        <Grid container alignItems="center" justifyContent="center" direction="column" spacing={2}>

                            <h2>Create Product</h2>

                            <Grid item>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    error={nameHelper.length !== 0}
                                    helperText={nameHelper}
                                    value={formValues.name}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="author"
                                    name="author"
                                    label="Author"
                                    type="text"
                                    error={authorHelper.length !== 0}
                                    helperText={authorHelper}
                                    value={formValues.author}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="imageUrl"
                                    name="imageUrl"
                                    label="ImageUrl"
                                    type="text"
                                    error={imageUrlHelper.length !== 0}
                                    helperText={imageUrlHelper}
                                    value={formValues.imageUrl}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="price"
                                    name="price"
                                    label="Price"
                                    type="number"
                                    error={priceHelper.length !== 0}
                                    helperText={priceHelper}
                                    value={formValues.price}
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
                                    value={formValues.description}
                                    error={descriptionHelper.length !== 0}
                                    helperText={descriptionHelper}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Button
                                disabled={
                                    formValues.name.length === 0 ||
                                    formValues.author.length === 0 ||
                                    formValues.description.length === 0 ||
                                    formValues.imageUrl.length === 0 ||
                                    formValues.price === 0 || nameHelper.length !== 0 ||
                                    authorHelper.length !== 0 || descriptionHelper.length !== 0 ||
                                    imageUrlHelper.length !== 0 || priceHelper.length !== 0
                                }
                                className={classes.button}
                                variant='contained'
                                type='submit'
                                color='primary'
                                fullWidth>
                                Create
                            </Button>
                            <Button
                                className={classes.button}
                                variant='contained'
                                onClick={() => navigate(`/product/list`)}
                                color='primary'
                                fullWidth
                            >
                                Back
                            </Button>
                        </Grid>
                    </Paper>
                </form>
            }{!auth.currentUser&& navigate('/login') }
            </>
    )
}

export default CreateProduct
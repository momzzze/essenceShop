import { Avatar, Button, FormControl, FormHelperText, Grid, Input, InputLabel, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './createProductStyle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { productCollectionRef } from '../../../lib/firestore.collections';
import { auth } from '../../../lib/init-firebase';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../lib/firebase.fetch';
import { faker } from '@faker-js/faker';



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
    const ratings = faker.ratings;
    const fastDel = faker.random;
    const inStock = faker.random;

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
                            value={formValues.name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="author"
                            name="author"
                            label="Author"
                            type="text"
                            value={formValues.author}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="imageUrl"
                            name="imageUrl"
                            label="ImageUrl"
                            type="text"
                            value={formValues.imageUrl}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            value={formValues.price}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Button
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
    )
}

export default CreateProduct
import { Avatar, Button, FormControl, FormHelperText, Grid, Input, InputLabel, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './createProductStyle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { addDoc } from 'firebase/firestore';
import { productCollectionRef } from '../../../lib/firestore.collections';
import { auth } from '../../../lib/init-firebase';
import { useNavigate } from 'react-router-dom';




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
        addDoc(productCollectionRef, {
            name: formValues.name,
            author: formValues.author,
            description: formValues.description,
            imageUrl: formValues.imageUrl,
            price: formValues.price,
            seller
        }).then(res => { console.log(res) }).catch(error => { console.log(error.message) });
        navigate('/product/list', { replace: true })
        console.log(formValues);
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
                </Grid>
            </Paper>
        </form>
    )
}

export default CreateProduct
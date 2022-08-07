import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React from 'react'
import useStyles from './editProductStyle';

const EditProduct = () => {
    const classes = useStyles();

    const editProductHandler = (e) => {
        e.preventDefault();
    }

    return (
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
                            // value={formValues.name}
                            // onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="author"
                            name="author"
                            label="Author"
                            type="text"
                            // value={formValues.author}
                            // onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="imageUrl"
                            name="imageUrl"
                            label="ImageUrl"
                            type="text"
                            // value={formValues.imageUrl}
                            // onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            // value={formValues.price}
                            // onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="description"
                            name='description'
                            label="Description"
                            multiline
                            minRows={4}
                            // value={formValues.description}
                            // onChange={handleInputChange}
                        />
                    </Grid>
                    <Button
                        className={classes.button}
                        variant='contained'
                        type='submit'
                        color='primary'
                        fullWidth>
                        Edit
                    </Button>
                </Grid>
            </Paper>
        </form>
    )
}

export default EditProduct
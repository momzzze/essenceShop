import React from 'react'
import { AppBar, Toolbar, IconButton, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import {Badge} from '@mui/material';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './navStyle';
import logo from '../../../assets/essence.png';
import { Stack } from '@mui/material';


const NavBar = () => {
    const classes = useStyles()

    const isClicked=()=>{
        console.log('Click');
    }

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='Essence' height="90px" className={classes.image} />
                        Essence.js
                    </Typography>

                    <div className={classes.grow} />

                    <Stack spacing={3} direction="row">
                        
                        <Button variant="contained">Login</Button>
                        <Button variant="contained">Register</Button>                        
                        <Button variant="contained" onClick={isClicked}>Logout</Button>
                    </Stack>


                    <div className={classes.button}>
                        <IconButton area-label="Show cart items" color='inherit'>
                            <Badge badgeContent={3} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar
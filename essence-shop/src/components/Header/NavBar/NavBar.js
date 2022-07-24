import React from 'react'
import { AppBar, Toolbar, IconButton, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { Badge } from '@mui/material';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './navStyle';
import logo from '../../../assets/essence.png';
import { Stack } from '@mui/material';
import { logout } from '../../Auth/authLogic';
import { auth } from '../../../lib/init-firebase';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    const classes = useStyles()

    const isClickedLogout = () => {
        logout();
        console.log('user logout');
        console.log(auth.currentUser);
    }

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color='inherit'>
                        <Link to='/' variant='secondary' color='secondary'>
                            <img src={logo} alt='Essence' height="90px" className={classes.image} />
                            Essence.js
                        </Link>
                    </Typography>

                    <div className={classes.grow} />

                    <Stack spacing={3} direction="row">
                        {!auth.currentUser && <>
                            <Button component={NavLink} to="/login" variant="contained"> Login </Button>
                            <Button component={NavLink} to="/register" variant="contained">Register</Button></>}
                        {auth.currentUser &&
                            <Button variant="contained" onClick={isClickedLogout}>Logout</Button>}
                    </Stack>


                    <div className={classes.button}>
                        <IconButton area-label="Show cart items" color='inherit'>
                            <Badge badgeContent={2} color='secondary'>
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
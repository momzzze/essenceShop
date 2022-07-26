import React from 'react'
import { AppBar, Toolbar, IconButton, ListItem, ListItemText, Button, ListItemIcon } from '@material-ui/core';
import { Badge } from '@mui/material';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './navStyle';
import logo from '../../../assets/essenceLogo.png';
import { Stack } from '@mui/material';
import { logout } from '../../Auth/authLogic';
import { auth } from '../../../lib/init-firebase';
import { Link, NavLink,useNavigate } from 'react-router-dom';

const NavBar = () => {
    const classes = useStyles()
    const navigate=useNavigate();

    const isClickedLogout = () => {
        logout();
        navigate('/',{ replace: true });
        
        console.log('user logout');
        console.log(auth.currentUser);
    }

    return (
        <>
            <AppBar position='sticky' className={classes.appBar} color='inherit'>
                <Toolbar>
                    {/* <Typography variant='h6' className={classes.title} color='inherit'>
                            
                        </Typography> */}
                    <Stack spacing={1} direction='row' m={1}>
                        <Link to='/' variant='secondary' color='primary'>
                            <ListItem button>
                                <ListItemIcon>
                                    <img src={logo} alt='Essence' height="35px" className={classes.image} />
                                </ListItemIcon>
                                <ListItemText color='primary'>
                                    Essence.js
                                </ListItemText>
                            </ListItem>
                        </Link>
                        <Link className={classes.link} to='/product/list' variant='secondary' color='primary' >
                                <ListItem button>
                                    <ListItemText>
                                        List Products
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        {auth.currentUser &&
                            <><Link className={classes.link} to='/product/create' variant='secondary' color='primary' >
                                <ListItem button>
                                    <ListItemText>
                                        Create Product
                                    </ListItemText>
                                </ListItem>
                            </Link>
                                <Link className={classes.link} to='/product/edit' variant='secondary' color='primary' >
                                    <ListItem button>
                                        <ListItemText>
                                            Edit Product
                                        </ListItemText>
                                    </ListItem>
                                </Link>
                            </>
                        }
                    </Stack>
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
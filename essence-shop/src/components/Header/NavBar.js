import React, { useContext } from 'react';
import {
    AppBar, Toolbar, SwipeableDrawer, IconButton, List, ListItem, ListItemText,
    useScrollTrigger, Menu, MenuItem, makeStyles,
    Tabs, Tab, Button, useTheme, useMediaQuery, Badge, Drawer, Select
} from '@material-ui/core';
import { FaShoppingCart } from 'react-icons/fa';
import MenuIcon from "@material-ui/icons/Menu";
import logo from '../../assets/logo.png';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './navStyle';
import { logout } from '../Auth/authLogic';
import { auth } from '../../lib/init-firebase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ProductContext } from '../../contexts/ProductContext';

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


const NavBar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { badger, setUser } = useContext(ProductContext);

    const navLinkChangeHandler = (e, newValue) => {
        setValue(newValue);
    }
    const handleClick = (e, value) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }
    const handleClose = (e, value) => {
        setAnchorEl(null);
        setOpenMenu(false);
    }
    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    }
    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        { name: 'Products', link: '/product/list', activeIndex: 1, ariaOwns: anchorEl ? 'simple-menu' : undefined, ariaPopup: anchorEl ? 'true' : undefined, mouseOver: event => handleClick(event) },
        { name: 'About us', link: '/info', activeIndex: 3 },
    ]
    useEffect(() => {
        [...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                default:
                    break;
            }
        })
    }, [value, selectedIndex, routes])
    const isClickedLogout = () => {
        navigate('/', { replace: true });
        logout();        
        console.log('user logout');
        console.log(auth.currentUser);
    }
    const tabs = (
        <React.Fragment>
            <Tabs value={value} onChange={navLinkChangeHandler} className={classes.container} indicatorColor="secondary">
                {!auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/'
                        label='Home'
                    />
                }
                {!auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/product/list'
                        label='Products'
                    />
                }
                {!auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/info'
                        label='About us'
                    />
                }

                {!auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/login'
                        label='Sign In'
                    />}
                {!auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/register'
                        label='Sign Up'
                    />
                }
                {auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/'
                        label='Home'
                    />
                }
                {auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/product/list'
                        label='Products'
                    />
                }
                {auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/product/create'
                        label='Create Product'
                    />
                }

                {auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/info'
                        label='About us'
                    />
                }
                {auth.currentUser &&
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to='/logout'
                        label='Logout'
                        onClick={isClickedLogout}
                    />
                }
            </Tabs>



        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{ paper: classes.drawer }}
            >
                <div className={classes.toolbarMargin} />
                <List disablePadding>

                    {routes.map((route, index) => (
                        <ListItem
                            key={`${route}${index}`}
                            divider
                            button
                            component={Link}
                            to={route.link}
                            classes={{ selected: classes.drawerItemSelected }}
                            onClick={() => { setOpenDrawer(false); setValue(route.activeIndex) }}
                        >
                            <ListItemText
                                className={classes.drawerItem}
                                disableTypography>{route.name}</ListItemText>
                        </ListItem>
                    ))}
                    {!auth.currentUser &&
                        <ListItem
                            classes={{ selected: classes.drawerItemSelected }}
                            component={Link}
                            to='/login'
                            label='Sign In'
                            onClick={() => { setOpenDrawer(false); }}
                        >
                            <ListItemText
                                className={classes.drawerItem}
                                disableTypography>Sign In</ListItemText>
                        </ListItem>}
                    {!auth.currentUser &&
                        <ListItem
                            classes={{ selected: classes.drawerItemSelected }}
                            component={Link}
                            to='/register'
                            label='Sign Up'
                            onClick={() => { setOpenDrawer(false); }}
                        >
                            <ListItemText
                                className={classes.drawerItem}
                                disableTypography>Sing Up</ListItemText>

                        </ListItem>}
                    {auth.currentUser &&
                        <>
                            <ListItem
                                classes={{ selected: classes.drawerItemSelected }}
                                component={Link}
                                to='/product/create'
                                label='Create Product'
                                onClick={() => { setOpenDrawer(false); setValue(7) }}
                            >
                                <ListItemText
                                    className={classes.drawerItem}
                                    disableTypography
                                >
                                    Create Product
                                </ListItemText>

                            </ListItem>

                            <ListItem
                                classes={{ selected: classes.drawerItemSelected }}
                                component={Button}                                
                                label='Logout'
                                onClick={() => {
                                    isClickedLogout();
                                    // setOpenDrawer(false);                                    
                                }}
                            >
                                <ListItemText
                                    className={classes.drawerItem}
                                    disableTypography
                                >
                                    Logout
                                </ListItemText>
                            </ListItem></>
                    }

                </List>

            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button component={Link} to='/' className={classes.logoContainer} disableRipple onClick={() => setValue(0)}>
                            <img alt="logo" className={classes.logo} src={logo} />
                        </Button>
                        {matches ? drawer : tabs}
                        {auth.currentUser &&
                            <>
                                <IconButton className={classes.tab} component={Link} to='/user/info' area-label="Show user Info">
                                    <Badge overlap='rectangular' >
                                        <AccountCircleIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton className={classes.tab} component={Link} to='/cart' area-label="Show user Info">
                                    <Badge overlap='rectangular' color='error' badgeContent={badger}>
                                        <FaShoppingCart fontSize="20px" />
                                    </Badge>
                                </IconButton>
                            </>
                        }
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}

export default NavBar


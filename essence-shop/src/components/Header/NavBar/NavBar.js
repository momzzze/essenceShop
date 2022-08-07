import React from 'react';
import {
    AppBar, Toolbar, SwipeableDrawer, IconButton, List, ListItem, ListItemText,
    useScrollTrigger, Menu, MenuItem, makeStyles,
    Tabs, Tab, Button, useTheme, useMediaQuery, Badge
} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import logo from '../../../assets/logo.png';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './navStyle';
import { ShoppingCart } from '@material-ui/icons';
import { logout } from '../../Auth/authLogic';
import { auth } from '../../../lib/init-firebase';

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
    const menuOptions = [
        {
            name: 'Products',
            link: '/product/list',
            activeIndex: 1,
            selectedIndex: 0
        }
    ]



    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        { name: 'Products', link: '/product/list', activeIndex: 1, ariaOwns: anchorEl ? 'simple-menu' : undefined, ariaPopup: anchorEl ? 'true' : undefined, mouseOver: event => handleClick(event) },
        { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
        { name: 'About us', link: '/about', activeIndex: 3 },
        { name: 'Contact us', link: '/contact', activeIndex: 4 },
        //{ name: 'Sign In', link: '/login', activeIndex: 5 },
        // { name: 'Sign Up', link: '/register', activeIndex: 6 }
    ]
    if (auth.currentUser) {
        menuOptions.push(
            {
                name: 'Create Product',
                link: '/product/create',
                activeIndex: 1,
                selectedIndex: 1
            }
        )
        routes.splice(2, 0, {
            name: 'Create Product', link: '/product/create', activeIndex: 1
        })
    }

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
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
    }, [value, menuOptions, selectedIndex, routes])

    const isClickedLogout = () => {
        logout();
        navigate('/', { replace: true });

        console.log('user logout');
        console.log(auth.currentUser);
    }
    const tabs = (
        <React.Fragment>
            <Tabs value={value} onChange={navLinkChangeHandler} className={classes.container} indicatorColor="secondary">

                {routes.map((route, index) => (
                    <Tab
                        key={`${route}${index}`}
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />
                ))}
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
                        to='/logout'
                        label='Logout'
                        onClick={isClickedLogout}
                    />}


            </Tabs>
            {/* <Button variant='contained' color='secondary' className={classes.button}>
                Free Estimate
            </Button> */}

            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                classes={{ paper: classes.menu }}
                MenuListProps={{ onMouseLeave: handleClose }}
                elevation={0}
                style={{ zIndex: 1302 }}
                keepMounted
            >
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={i}
                        component={Link}
                        to={option.link}
                        onClick={(event) => {
                            handleMenuItemClick(event, i);
                            setValue(1);
                            handleClose();
                        }}
                        classes={{ root: classes.menuItem }}
                        selected={i === selectedIndex && value === 1}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                // disableBackdropTransition={!iOS}
                // disableDiscovery={iOS}
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
                            selected={value === route.activeIndex}
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
                            onClick={() => { setOpenDrawer(false); setValue(5) }}
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
                            onClick={() => { setOpenDrawer(false); setValue(6) }}
                        >
                            <ListItemText
                                className={classes.drawerItem}
                                disableTypography>Sing Up</ListItemText>

                        </ListItem>}
                    {auth.currentUser &&
                        <ListItem
                            classes={{ selected: classes.drawerItemSelected }}
                            component={Link}
                            to='/logout'
                            label='Logout'
                            onClick={() => { setOpenDrawer(false); setValue(7) }}
                        >
                            <ListItemText
                                className={classes.drawerItem}
                                disableTypography>Logout</ListItemText>

                        </ListItem>}

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
                        <IconButton className={classes.tab} component={Link} to='/product/cart' area-label="Show cart items">
                            <Badge overlap='rectangular' badgeContent={2}>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}

export default NavBar
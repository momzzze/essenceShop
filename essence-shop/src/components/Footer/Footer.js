import React from 'react';
import useStyles from './footerStyle';
import { Grid, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';
import footerAdornment from '../../assets/Footer Adornment.svg';
export const Footer = () => {

    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Hidden mdDown>
                <Grid container justifyContent='center' className={classes.mainContainer}>
                    <Grid item component={Link} to='/' className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item className={classes.link}>
                                Home
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item component={Link} to='/product/list' className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item className={classes.link}>
                                Products
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item component={Link} to='/about' className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item className={classes.link}>
                                About Us
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item component={Link} to='/contact' className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item className={classes.link}>
                                Contact Us
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item component={'a'} href="https://github.com/momzzze/essenceShop" rel='noopener noreferrer' target='_blank' className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item className={classes.link}>
                                Project Page
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <img
                alt='decorative slash'
                src={footerAdornment}
                className={classes.adornment}
            />
            <Grid justifyContent='flex-end' spacing={2} container className={classes.socialContainer}>
                <Grid item component={'a'} href="http://www.facebook.com" rel='noopener noreferrer' target='_blank'>
                    <img alt='facebook logo' src={facebook} className={classes.icon} />
                </Grid>
                <Grid item component={'a'} href="http://www.twitter.com" rel='noopener noreferrer' target='_blank'>
                    <img alt='twitter logo' src={twitter} className={classes.icon} />
                </Grid>
                <Grid item component={'a'} href="http://www.instagram.com" rel='noopener noreferrer' target='_blank'>
                    <img alt='instagram logo' src={instagram} className={classes.icon} />
                </Grid>
            </Grid>
        </footer>
    )
}
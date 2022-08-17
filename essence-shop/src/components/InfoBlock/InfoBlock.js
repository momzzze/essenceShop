import React from 'react'
import { Card, CardActionArea, CardActions, CardMedia, CardContent, Button, Typography, Grid, Paper, styled, ButtonBase, Box, CardHeader, IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import logo from '../../assets/logo.png'
import makeStyles from './aboutStyle';
import { Link } from 'react-router-dom';
const InfoBlock = () => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const classes = makeStyles();
    return (
        <Grid
            container
            style={{ height: "37em" }}
            alignItems="center"
            direction="row"
            className={classes.infoBackground}
        >
            <Grid
                item
                container
                style={{
                    textAlign: matchesXS ? "center" : "inherit"
                }}
                direction={matchesXS ? "column" : "row"}
            >
                <Grid
                    item
                    sm
                    style={{ marginLeft: matchesXS ? 0 : matchesSM ? "2em" : "5em" }}
                >
                    <Grid
                        container
                        style={{ marginBottom: matchesXS ? "10em" : 0 }}
                        direction="column"
                    >
                        <Typography variant="h2" style={{ color: "white" }}>
                            About Us
                        </Typography>
                        <Typography variant="subtitle2">Let's get personal.</Typography>
                        <Grid item>
                            <Button
                                component={Link}
                                to="/info/about"
                                variant="outlined"
                                style={{ color: "white", borderColor: "white" }}
                                className={classes.learnButton}

                            >
                                <span style={{ marginRight: 10 }}>Learn More</span>

                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    sm
                    style={{
                        marginRight: matchesXS ? 0 : matchesSM ? "2em" : "5em",
                        textAlign: matchesXS ? "center" : "right"
                    }}
                >
                    <Grid container direction="column">
                        <Typography variant="h2" style={{ color: "white" }}>
                            Contact Us
                        </Typography>
                        <Typography variant="subtitle2">
                            Say hello!{" "}
                            <span role="img" aria-label="waving hand">
                                👋🏻
                            </span>
                        </Typography>
                        <Grid item>
                            <Button
                                component={Link}
                                to="/info/contact"
                                variant="outlined"
                                style={{ color: "white", borderColor: "white" }}
                                className={classes.learnButton}

                            >
                                <span style={{ marginRight: 10 }}>Learn More</span>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>



    )
}

export default InfoBlock
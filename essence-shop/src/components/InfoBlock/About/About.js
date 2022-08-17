import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Grid, Typography, useMediaQuery } from '@material-ui/core';
import history from '../../../assets/history.svg';
import mySelf from '../../../assets/myself.jpg';
const useStyles = makeStyles(theme => ({
    missionStatement: {
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: '1.5rem',
        maxWidth: '50rem',
        lineHeight: 1.4
    },
    rowContainer: {
        paddingLeft: '5em',
        paddingRight: '5em',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '1.5em',
            paddingRight: '1.5em'
        }
    },
    avatar: {
        height: "15em",
        width: '15em'
    }
}))


export const About = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container direction='column'>
            <Grid item className={classes.rowContainer} style={{ marginTop: '2em' }}>
                <Typography variant='h2'>About Us</Typography>
            </Grid>
            <Grid item container className={classes.rowContainer} justifyContent='center'>
                <Typography variant='h4' align='center' className={classes.missionStatement}>
                    Whether it be person to person,business to consumer,or an individual to their interests,technology is meant to bring us closer to what we care about in the best way possible.
                    We are on a mission to make art sustainable, accessible, affordable, and a joy to discover, while supporting artists to make a living doing what they love.
                </Typography>
            </Grid>
            <Grid item container className={classes.rowContainer} direction={matchesMD ? 'column' : 'row'}
                alignItems={matchesMD ? 'center' : undefined}
                justifyContent='space-around'>
                <Grid item>
                    <Grid item container direction='column' lg style={{ maxWidth: '35em' }}>
                        <Grid item>
                            <Typography variant='h4' gutterBottom>History</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body1' gutterBottom style={{ fontWeight: 700, fontStyle: 'italic' }}>
                                We are the new kid on the block
                            </Typography>
                            <Typography variant='body1' paragraph>
                                We launched Essence to challenge the industry to offer a fair and sustainable marketplace for artists, where anyone can discover and buy original art. We’re committed to eliminating the ‘starving artist’ syndrome and believe that affordable art and artist success shouldn’t be mutually exclusive.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid item container justifyContent='center' lg>
                        <img src={history} alt="quill pen sitting on top of book" style={{ height: '22em' }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container alignItems='center' direction='column' className={classes.rowContainer}>
                <Grid item>
                    <Typography variant='h4' gutterBottom>Team</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' paragraph align='center'>
                        Nikola Ninov, Founder
                    </Typography>
                    <Typography variant='body1' paragraph align='center'>
                        I started this web app for project defence in SoftUni!
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar alt='founder' src={mySelf} className={classes.avatar} />
                </Grid>
            </Grid>
        </Grid>
    )
}


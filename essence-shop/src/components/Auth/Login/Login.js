import { ThemeProvider } from '@emotion/react';
import { Grid, Paper, Avatar,  Button, Typography, Link } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Alert, TextField } from '@mui/material';
import React, { useState } from 'react';
import makeStyles, { themeAuth } from '../authStyle';
import { login } from '../authLogic';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState('');

    const classes = makeStyles();
    const theme = themeAuth;
    const navigate = useNavigate();
    const emailChangeHandler = (e) => {
        setLoginEmail(e.target.value)
    }
    const passwordChangeHandler = (e) => {
        setLoginPassword(e.target.value)
    }
    const loginHandler = (e) => {
        e.preventDefault();
        login({ loginEmail, loginPassword }).then(res => {
            if (res) {
                setError(res);
            } else {
                navigate('/', { replace: true });
            }
        })

    }
    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={loginHandler}>
                <Grid>
                    <Paper elevation={10} className={classes.paperStyle}>
                        <Grid align="center">
                            <Avatar className={classes.avatarStyle}>
                                <LockOpenIcon />
                            </Avatar>
                            <h2>Sign in</h2>
                        </Grid>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField className={classes.textField}
                            required
                            id="email"
                            name='email'
                            label="Email"
                            value={loginEmail}
                            placeholder='Enter email'// value="Username"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={emailChangeHandler}
                        />
                        <TextField
                            required
                            id="password"
                            name='password'
                            label="Password"
                            placeholder='Enter password'// value="Username"
                            fullWidth
                            value={loginPassword}
                            type='password'
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            onChange={passwordChangeHandler}
                        />
                        <Button className={classes.button} variant='contained' type='submit' color='primary' fullWidth>Sign in</Button>
                        <Typography> You don't have an accaunt ?
                            <Link href="/register">
                                Sign Up ?
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </form>
        </ThemeProvider>

    )
}
export default Login
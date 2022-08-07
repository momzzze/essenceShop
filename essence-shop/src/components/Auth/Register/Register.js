import { ThemeProvider } from '@emotion/react';
import { Grid, Paper, Avatar, FormControlLabel, Checkbox, Button, Typography, Link } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Alert, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import makeStyles, { themeAuth } from '../authStyle';
import { register } from '../authLogic';
import { async } from '@firebase/util';
import { auth } from '../../../lib/init-firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const classes = makeStyles();
    const theme = themeAuth;
    const navigate = useNavigate();

    const emailChangeHandler = (e) => {
        setRegisterEmail(e.target.value);
    }
    const passwordChangeHandler = (e) => {
        setRegisterPassword(e.target.value);
    }
    const passwordConfirmChangeHandler = (e) => {
        setRegisterConfirmPassword(e.target.value);
    }

    const registerHandler = (e) => {
        e.preventDefault();
        if (registerPassword !== registerConfirmPassword) {
            return setError('Passwords do not match!');
        }
        setError("");
        setLoading(true);
        register({ registerEmail, registerPassword }).then(res => {
            if (res) {
                setError(res);
            } else {
                navigate('/', { replace: true });
            }

        })
        setLoading(false);
    }


    return (

        <ThemeProvider theme={theme}>
            <form onSubmit={registerHandler}>
                <Grid>
                    <Paper elevation={10} className={classes.paperStyle}>
                        <Grid align="center">
                            <Avatar className={classes.avatarStyle}>
                                <LockOpenIcon />
                            </Avatar>
                            <h2>Sign up</h2>
                        </Grid>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField className={classes.textField}
                            required
                            id="email"
                            name='email'
                            label="Email"
                            placeholder='Enter email'// value="Username"
                            fullWidth
                            value={registerEmail}
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
                            type='password'
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            value={registerPassword}
                            onChange={passwordChangeHandler}
                        />
                        <TextField
                            required
                            id="confirmPassword"
                            name='confirmPassword'
                            label="Confirm Password"
                            placeholder='Confirm password'// value="Username"
                            fullWidth
                            type='password'
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            value={registerConfirmPassword}
                            onChange={passwordConfirmChangeHandler}
                        />
                        
                        <Button className={classes.button} variant='contained' type='submit' color='primary' disabled={loading} fullWidth>Sign up</Button>
                        <Typography> Do you have an accaunt ?
                            <Link href="/login">
                                Sign in ?
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </form>
        </ThemeProvider>

    )
}

export default Register
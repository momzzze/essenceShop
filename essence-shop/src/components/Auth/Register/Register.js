import { ThemeProvider } from '@emotion/react';
import { Grid, Paper, Avatar, FormControlLabel, Checkbox, Button, Typography, Link } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import makeStyles, { themeAuth } from '../authStyle';
import { register } from '../authLogic';

const Register = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const classes = makeStyles();
    const theme = themeAuth;
    

    const emailChangeHandler=(e)=>{
        setRegisterEmail(e.target.value)
    }
    const passwordChangeHandler=(e)=>{
        setRegisterPassword(e.target.value)
    }

    const registerHandler = (e) => {
        e.preventDefault();        
        register({ registerEmail, registerPassword });
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
                            id="password"
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
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={state.checkedB}
                                    // onChange={handleChange}
                                    name="checkedB"
                                    style={{
                                        color: "black"
                                    }}
                                />
                            }
                            label="Remember me"
                        />
                        <Button className={classes.button} variant='contained' type='submit' color='primary' fullWidth>Sign up</Button>
                        <Typography> Do you have an accaunt ?
                            <Link href="#">
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
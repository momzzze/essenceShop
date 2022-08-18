import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import useStyles from './contactStyle';
import phoneIcon from "../../../assets/phone.svg";
import emailIcon from "../../../assets/email.svg";
import airplane from "../../../assets/send.svg";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/init-firebase";
import { Alert } from "@mui/material";




export default function Contact(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const [name, setName] = useState("");
    const [nameHelper, setNameHelper] = useState('')
    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState('')
    const [phone, setPhone] = useState("");
    const [phoneHelper, setPhoneHelper] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMesssage] = useState("");

    const onChange = event => {
        let valid;
        switch (event.target.id) {
            case "email":
                setEmail(event.target.value);
                valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                    event.target.value
                );
                if (!valid) {
                    setEmailHelper("Invalid email");
                } else {
                    setEmailHelper("");
                }
                break;
            case "phone":
                setPhone(event.target.value);
                valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
                    event.target.value
                );

                if (!valid) {
                    setPhoneHelper("Invalid phone");
                } else {
                    setPhoneHelper("");
                }
                break;
            default:
                break;
        }
    };
    const sendMassage = async () => {
        const dbRef = collection(db, 'messages');
        let messageForm = {
            name,
            email,
            phone,
            message
        }
        setOpen(false);
        await addDoc(dbRef, messageForm).then(res => {
            setAlert(true);
        })


    }

    const buttonContents = (
        <React.Fragment>
            Send Message
            <img src={airplane} alt="paper airplane" style={{ marginLeft: "1em" }} />
        </React.Fragment>
    );

    return (
        <>
            {alert && <Alert onClose={() => {setAlert(false)}} security="success" style={{marginBottom: '25px'}}>Message was sent successfully</Alert>}
            <Grid style={{ marginTop: '-14px' }} container direction="row">
                {/* Form Contrainer */}
                <Grid item container direction="column" alignItems="center" style={{ marginBottom: matchesMD ? '5em' : 0, marginTop: matchesMD ? '5em' : 0 }} justifyContent="center" xl={3} lg={4}>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant='h2' align={matchesMD ? 'center' : undefined} style={{ lineHeight: 1, color: theme.palette.common.blue }}>Contact Us</Typography>
                                <Typography variant='body1' style={{ color: theme.palette.common.blue }}>We are waiting.</Typography>
                            </Grid>
                            <Grid item container justifyContent="center" style={{ marginTop: '2em' }}>
                                <Grid item>
                                    <img src={phoneIcon} alt='phone' style={{ marginRight: '0.5em' }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" style={{ color: theme.palette.common.blue, fontSize: "1rem" }}><a style={{ textDecoration: 'none', color: 'inherit' }} href="tel:(359)123456789">(359)123456789</a></Typography>
                                </Grid>
                            </Grid>
                            <Grid item container justifyContent="center" style={{ marginBottom: '2em' }}>
                                <Grid item>
                                    <img src={emailIcon} alt='email' style={{ marginRight: '0.5em', verticalAlign: 'bottom' }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" style={{ color: theme.palette.common.blue, fontSize: "1rem" }}> <a style={{ textDecoration: 'none', color: 'inherit' }} href="mailto:nikola@ninov.org">nikola@ninov.org</a></Typography>
                                </Grid>
                            </Grid>
                            <Grid item container direction="column" style={{ maxWidth: '20em' }}>
                                <Grid item style={{ marginBottom: '0.5em' }}>
                                    <TextField
                                        label='Name'
                                        id="name"
                                        value={name}
                                        fullWidth
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item style={{ marginBottom: '0.5em' }} >
                                    <TextField
                                        label='Email'
                                        id="email"
                                        error={emailHelper.length !== 0}
                                        helperText={emailHelper}
                                        value={email}
                                        fullWidth
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item style={{ marginBottom: '0.5em' }} >
                                    <TextField
                                        label='Phone'
                                        id="phone"
                                        error={phoneHelper.length !== 0}
                                        helperText={phoneHelper}
                                        value={phone}
                                        fullWidth
                                        onChange={onChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item style={{ maxWidth: '20em' }}>
                                <TextField
                                    value={message}
                                    className={classes.message}
                                    color='primary'
                                    InputProps={{ disableUnderline: true }}
                                    multiline
                                    minRows={10}
                                    fullWidth
                                    id="message"
                                    onChange={e => setMessage(e.target.value)}
                                />
                            </Grid>
                            <Grid item container justifyContent="center">
                                <Button
                                    disabled={
                                        name.length === 0 ||
                                        email.length === 0 ||
                                        phone.length === 0 ||
                                        message.length === 0 ||
                                        phoneHelper.length !== 0 ||
                                        emailHelper.length !== 0
                                    }
                                    variant="contained"
                                    className={classes.sendButton}
                                    onClick={() => setOpen(true)}
                                >
                                    Send Message
                                    <img src={airplane} alt="paper airplane" style={{ marginLeft: "1rem" }} /></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
                <Dialog fullScreen={matchesXS} style={{ zIndex: 1302 }} open={open} onClose={() => setOpen(false)} PaperProps={{ style: { paddingTop: matchesXS ? "1em" : '3em', paddingBottom: matchesXS ? "1em" : '3em', paddingRight: matchesXS ? "1em" : '3em', paddingLeft: matchesXS ? "1em" : '3em' } }}>
                    <DialogContent>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h4" gutterBottom>Confirm Message</Typography>
                            </Grid>

                            <Grid item style={{ marginBottom: '0.5em' }}>
                                <TextField
                                    label='Name'
                                    id="name"
                                    value={name}
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item style={{ marginBottom: '0.5em' }} >
                                <TextField
                                    label='Email'
                                    id="email"
                                    error={emailHelper.length !== 0}
                                    helperText={emailHelper}
                                    value={email}
                                    fullWidth
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item style={{ marginBottom: '0.5em' }} >
                                <TextField
                                    label='Phone'
                                    id="phone"
                                    error={phoneHelper.length !== 0}
                                    helperText={phoneHelper}
                                    value={phone}
                                    fullWidth
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item style={{ maxWidth: '20em' }}>
                                <TextField
                                    value={message}
                                    className={classes.message}
                                    color='primary'
                                    InputProps={{ disableUnderline: true }}
                                    multiline
                                    minRows={10}
                                    fullWidth
                                    id="message"
                                    onChange={e => setMessage(e.target.value)}
                                />
                            </Grid>
                            <Grid item container style={{ marginTop: '2em' }} alignItems="center">
                                <Grid item>
                                    <Button color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                                </Grid>
                                <Grid item>
                                    <Button color="secondary" onClick={(e) => sendMassage(e)}>Send Message</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent >
                </Dialog >

                <Grid
                    item
                    container
                    direction={matchesMD ? "column" : "row"}
                    className={classes.background}
                    alignItems="center"
                    justifyContent={matchesMD ? "center" : undefined}
                    lg={8}
                    xl={9}
                >
                    <Grid
                        item
                        style={{
                            marginLeft: matchesMD ? 0 : "3em",
                            textAlign: matchesMD ? "center" : "inherit"
                        }}
                    >
                        <Grid container direction="column">
                            <Grid item>
                                <Typography align={matchesMD ? "center" : undefined} variant="h2">
                                    Simple WebApp.
                                    <br />
                                    Our History.
                                </Typography>
                                <Typography
                                    align={matchesMD ? "center" : undefined}
                                    variant="subtitle2"
                                    style={{ fontSize: "1.5rem" }}
                                >
                                    Take advantage of the 21st Century.
                                </Typography>
                                <Grid container justifyContent={matchesMD ? "center" : undefined} item>
                                    <Button
                                        component={Link}
                                        to="/info/about"
                                        variant="outlined"
                                        className={classes.learnButton}
                                        onClick={() => props.setValue(2)}
                                    >
                                        <span style={{ marginRight: 5 }}>Learn More</span>

                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to="/product/list"

                            variant="contained"
                            className={classes.estimateButton}
                            onClick={() => props.setValue(5)}
                        >
                            Our Products
                        </Button>
                    </Grid>
                </Grid>
            </Grid >
        </>

    );
}


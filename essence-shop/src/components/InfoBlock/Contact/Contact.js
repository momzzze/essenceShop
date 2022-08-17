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
import background from "../../../assets/background.jpg";
import mobileBackground from "../../../assets/mobileBackground.jpg";
import phoneIcon from "../../../assets/phone.svg";
import emailIcon from "../../../assets/email.svg";
import airplane from "../../../assets/send.svg";

const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "60em",
        paddingBottom: "10em",
        [theme.breakpoints.down("md")]: {
            backgroundImage: `url(${mobileBackground})`
        }
    },
    estimateButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 80,
        width: 205,
        backgroundColor: theme.palette.common.orange,
        fontSize: "1.5rem",
        marginRight: "5em",
        marginLeft: "2em",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down("md")]: {
            marginLeft: 0,
            marginRight: 0
        }
    },
    learnButton: {
        ...theme.typography.learnButton,
        fontSize: "0.7rem",
        height: 35,
        padding: 5,
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        }
    },
    message: {
        border: `2px solid ${theme.palette.common.blue}`,
        marginTop: "5em",
        borderRadius: 5
    },
    sendButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 45,
        width: 245,
        fontSize: "1rem",
        backgroundColor: theme.palette.common.orange,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down("sm")]: {
            height: 40,
            width: 225
        }
    }
}));

export default function Contact(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");

    const [phone, setPhone] = useState("");
    const [phoneHelper, setPhoneHelper] = useState("");

    const [message, setMessage] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({ open: false, color: "" });
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

    const onConfirm = () => {
        setLoading(true);

        axios
            .get(
                "https://us-central1-material-ui-course.cloudfunctions.net/sendMail",
                {
                    params: {
                        email: email,
                        name: name,
                        phone: phone,
                        message: message
                    }
                }
            )
            .then(res => {
                setLoading(false);
                setOpen(false);
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
                setAlert({ open: true, color: "#4BB543" });
                setAlertMesssage("Message sent successfully!");
            })
            .catch(err => {
                setLoading(false);
                setAlert({ open: true, color: "#FF3232" });
                setAlertMesssage("Something went wrong! Please try again.");
                console.error(err);
            });
    };

    const buttonContents = (
        <React.Fragment>
            Send Message
            <img src={airplane} alt="paper airplane" style={{ marginLeft: "1em" }} />
        </React.Fragment>
    );

    return (
        <Grid container direction="row">
            <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{
                    marginBottom: matchesMD ? "5em" : 0,
                    marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0
                }}
                lg={4}
                xl={3}
            >
                <Grid item>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography
                                align={matchesMD ? "center" : undefined}
                                variant="h2"
                                style={{ lineHeight: 1 }}
                            >
                                Contact Us
                            </Typography>
                            <Typography
                                align={matchesMD ? "center" : undefined}
                                variant="body1"
                                style={{ color: theme.palette.common.blue }}
                            >
                                We're waiting.
                            </Typography>
                        </Grid>
                        <Grid item container style={{ marginTop: "2em" }}>
                            <Grid item>
                                <img
                                    src={phoneIcon}
                                    alt="phone"
                                    style={{ marginRight: "0.5em" }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                                >
                                    <a
                                        href="tel:5555555555"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        (+359) 555-5555
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container style={{ marginBottom: "2em" }}>
                            <Grid item>
                                <img
                                    src={emailIcon}
                                    alt="envelope"
                                    style={{ marginRight: "0.5em", verticalAlign: "bottom" }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                                >
                                    <a
                                        href="nikola@ninov.org"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        nikola@ninov.org
                                    </a>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="column" style={{ width: "20em" }}>
                            <Grid item style={{ marginBottom: "0.5em" }}>
                                <TextField
                                    label="Name"
                                    id="name"
                                    fullWidth
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                            </Grid>
                            <Grid item style={{ marginBottom: "0.5em" }}>
                                <TextField
                                    label="Email"
                                    error={emailHelper.length !== 0}
                                    helperText={emailHelper}
                                    id="email"
                                    fullWidth
                                    value={email}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item style={{ marginBottom: "0.5em" }}>
                                <TextField
                                    label="Phone"
                                    helperText={phoneHelper}
                                    error={phoneHelper.length !== 0}
                                    id="phone"
                                    fullWidth
                                    value={phone}
                                    onChange={onChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item style={{ width: "20em" }}>
                            <TextField
                                InputProps={{ disableUnderline: true }}
                                value={message}
                                className={classes.message}
                                multiline
                                fullWidth
                                minRows={10}
                                id="message"
                                onChange={event => setMessage(event.target.value)}
                            />
                        </Grid>
                        <Grid item container justifyContent="center" style={{ marginTop: "2em" }}>
                            <Button
                                disabled={
                                    name.length === 0 ||
                                    message.length === 0 ||
                                    phoneHelper.length !== 0 ||
                                    emailHelper.length !== 0
                                }
                                variant="contained"
                                className={classes.sendButton}
                                onClick={() => setOpen(true)}
                            >
                                {buttonContents}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
           
            <Snackbar
                open={alert.open}
                ContentProps={{
                    style: {
                        backgroundColor: alert.color
                    }
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                message={alertMessage}
                autoHideDuration={4000}
                onClose={() => setAlert(false)}
            />
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
        </Grid>
    );
}
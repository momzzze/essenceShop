import { createTheme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25px',
    },
    paperStyle: {
        margin: "90px auto",
        padding: "20px",
        height: "70vh",
        width: 500,
    },
    avatarStyle: {
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: '#362626',
        },
        margin: '20px 0'
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "black !important"
    }
}));

export const themeAuth = createTheme({
    palette: {
        primary: {
            main: "#212121", //this overide blue color
            light: "#CFD8DC", //overides light blue
            dark: "#424242", //overides dark blue color
        },
    },
});

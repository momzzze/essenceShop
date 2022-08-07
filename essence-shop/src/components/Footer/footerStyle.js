import { makeStyles } from '@material-ui/core/styles';
import { width } from '@mui/system';


export default makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.secondary.main,
        width: "100%",
        zIndex: 1302,
        position: "relative"
    },
    adornment: {
        width: '25em',
        verticalAlign: 'bottom',   
        [theme.breakpoints.down('md')]: {
            width: '21em'
        },
        [theme.breakpoints.down('xs')]: {
            width: '15em'
        }
    },
    mainContainer: {
        position: 'absolute'
    },
    link: {
        color: theme.palette.primary.secondary,
        fontFamily: 'Arial',
        fontSize: '1rem',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
    gridItem: {
        margin: '3em'
    },
    icon: {
        height: '4em',
        weight: '4em',
        [theme.breakpoints.down('xs')]: {
            height: '2.5em',
            width: '2.5em'
        }
    },
    socialContainer: {
        position: 'absolute',
        marginTop: '-6em',
        right: '1.5em',
        bottom: '1.1em',
        [theme.breakpoints.down('xs')]: {
            right: '1em',
        }
    }
}))
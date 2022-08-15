import { makeStyles, alpha } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '1.3em',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1em',
        },

        textDecoration: 'none'
    },
    logo: {
        height: '7em',
        [theme.breakpoints.down('md')]: {
            height: '5em',
        },
        [theme.breakpoints.down('xs')]: {
            height: '4em',
        },

    },
    container: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "30px",
        color: theme.palette.primary.secondary,
        "&:hover": {
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            backgroundColor: 'transparent',
        },
        textDecoration: 'none',

    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginRight: "25px",
        marginLeft: "50px",
        height: '45px',

    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: 'transparent',

        }
    },
    menu: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.secondary,
        borderRadius: '0px',
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: '0.2',

        }
    },
    drawerIconContainer: {
        marginLeft: 'auto',
        "&:hover": {
            backgroundColor: 'transparent',

        }
    },
    drawerIcon: {
        height: '50px',
        width: '50px',
        color: 'white'
    },
    drawer: {
        backgroundColor: theme.palette.primary.main,
    },
    drawerItem: {
        ...theme.typography.tab,
        color: theme.palette.primary.secondary,
        opacity: 0.7,
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.secondary.main
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {

            opacity: 1
        }
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1
    }
}))


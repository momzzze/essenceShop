import { makeStyles, alpha } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
    paperStyle: {
        margin: "90px auto",
        padding: "20px",
        height: "70vh auto",
        width: 500,
    },
    avatarStyle: {
        backgroundColor: theme.palette.primary.secundary,
    },
    button: {
        color: '#362626',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: '#362626',
            color: theme.palette.primary.main
        },
        margin: '20px 0'
    },
}))
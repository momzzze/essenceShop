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
        backgroundColor: 'black',
    },
    button: {
        color: 'white',
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: '#362626',
        },
        margin: '20px 0'
    },
}))
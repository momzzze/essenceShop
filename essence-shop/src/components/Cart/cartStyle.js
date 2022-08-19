import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    button: {
        position: "fixed",
        zIndex: 100,
        right: "20px",
        top: '20px'
    },
    paperStyle: {
        margin: "20px auto",
        padding: "15px",
        height: 400,
        width: 500,
    },
    buttonCheck: {
        color: '#362626',
        backgroundColor: theme.palette.primary.main,
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: '#362626',
            color: theme.palette.primary.main
        },
        margin: '20px 0'
    }
}))
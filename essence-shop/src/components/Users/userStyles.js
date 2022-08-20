import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    sendButton: {
        ...theme.typography.estimate,
        borderRadius: 50,
        height: 45,
        width: 245,
        fontSize: "1rem",
        color: '#362626',
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: '#362626',
            color: theme.palette.primary.main
        },
        [theme.breakpoints.down("sm")]: {
            height: 40,
            width: 225
        },
    }
}))



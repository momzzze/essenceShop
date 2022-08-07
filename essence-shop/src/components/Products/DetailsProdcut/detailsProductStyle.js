import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    buttonErr: {
        color: 'red',
        '&:hover': {
            color: 'red'
        }
    },
    buttonGreen: {
        color: 'green',
        '&:hover': {
            color: 'green'
        }
    },
    marginAutoContainer: {
        width: 500,
        height: 80,
        display: 'flex',
        backgroundColor: 'gold',
    },
    marginAutoItem: {
        margin: 'auto'
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
    },
}))
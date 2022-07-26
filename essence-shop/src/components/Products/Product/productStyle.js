import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
        maxWidth: '100%'
    },
    media: {
        height: 0,
        padding: '56.25%'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    link: {
        textDecoration: "none",
        color: '#FFAB91',
        "&:hover": {
            color: '#FFAB91',
            textDecoration: "none"
        }
    },
    buttonGreen: {
        color: '#32CD32',
        "&:hover": {
            color: '#9ACD32',
            textDecoration: "none"
        }
    },    
    buttonRed: {
        color: '#FF0000',
        "&:hover": {
            color: '#FF6347',
            textDecoration: "none"
        }
    }
}));

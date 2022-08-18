
import { makeStyles } from "@material-ui/core/styles";
import background from "../../../assets/background.jpg";
import mobileBackground from "../../../assets/mobileBackground.jpg";
import {Colors} from '../../../theme';
export default makeStyles((theme) => ({
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
        backgroundColor: theme.palette.secondary.main,
        fontSize: "1.5rem",
        marginRight: "5em",
        marginLeft: "2em",
        "&:hover": {
            backgroundColor: '#362626',
            color: theme.palette.primary.main
        },
        color: '#362626',        
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
        border: `2px solid ${Colors.secondary}`,
        marginTop: "5em",
        borderRadius: 5
    },
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
        }
    }
}));
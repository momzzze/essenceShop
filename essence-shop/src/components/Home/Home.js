import { AppBar, Box, Toolbar, Typography } from "@material-ui/core"
import useStyles from './homeStyles';

export const Home = () => {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.hero}>
                <Box>HomePage</Box>
            </Box>
        </>
    )
}


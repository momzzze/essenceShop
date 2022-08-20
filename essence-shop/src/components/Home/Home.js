import { AppBar, Box, Toolbar, Typography } from "@material-ui/core"
import Products from "../Products/Products";
import useStyles from './homeStyles';

export const Home = () => {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.hero}>
                <Box>Essence</Box>
            </Box>
            <Products/>
        </>
    )
}


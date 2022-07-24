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

{/* <div
    className="p-5 text-center bg-image">
    <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
                <h1 className="mb-3">Heading</h1>
                <h4 className="mb-3">Subheading</h4>
                <a className="btn btn-outline-light btn-lg" href="#!" role="button">
                    Call to action
                </a>
            </div>
        </div>
    </div>
</div> */}
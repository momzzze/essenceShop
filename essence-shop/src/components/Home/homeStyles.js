import { makeStyles } from '@material-ui/core/styles';




export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(7),
    },
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#fff'
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0,0,0, 0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1658242356534-9935f4e9aaed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
        height: '500px',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
    }
}));
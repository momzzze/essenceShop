import { createTheme } from '@material-ui/core/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const red = '#f44336';

export const theme = createTheme({
    palette: {
       
        common: {
            blue: `${arcBlue}`,
            orange: `${arcOrange}`
        },
        primary: {
            main: `#f8e6ad`,
            secondary: `#21040a`,
        },
        secondary: {
            main: "#eab676",
            secondary: '#d35e20',
        }
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1rem',
        },
        estimate: {
            fontFamily: "Pacifico",
            fontSize: '1rem',
            textTransform: 'none',
            color: "white",
        }
    },
    background: {
        default: "#ffffff"
    }
})
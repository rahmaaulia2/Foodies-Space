import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { readData } from '../store/fetch';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Elevation() {
    const dispatch = useDispatch()
    const ini = useSelector((state) => {
        return state.fetch.dataFood
    })

    React.useEffect(() => {
        dispatch(readData())
    }, [])
    console.log(ini, '<<<<<<<<<<<<<<<<<');
    return (
        <Grid container spacing={8}>
            {[lightTheme].map((theme, index) => (
                <Grid item xs={14} key={index}>
                    <ThemeProvider theme={theme}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                gridTemplateColumns: { md: '5fr 5fr' },
                                gap: 10,
                            }}
                        >
                            <Link to={'/home'}>Back to Home</Link>
                            <Link to={'/login'} onClick={()=>{localStorage.clear()}}>Logout</Link>
                            {ini.map((elevation) => (
                                <Item key={elevation} elevation={elevation}>
                                    <Link to={`/foods/${elevation.id}`} style={{color : "green"}}>See Detail</Link>
                                    <img src={elevation.strMealThumb} style={{height : "100px", alignItems : "center", justifyContent : "center"}}/>
                                </Item>
                            ))}
                        </Box>
                    </ThemeProvider>
                </Grid>
            ))}
        </Grid>
    );
}

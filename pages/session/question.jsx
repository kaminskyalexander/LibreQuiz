import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function question()
{
    const theme = useTheme();
    return <>
        <Typography variant="h2" align="center" sx={{m: 6}}>What does (+ 2 2) evaluate to?</Typography>
        <Grid container alignItems="center" justifyContent="center" style={{minWidth: '100vw'}}>
            <Grid container spacing={3} style={{ maxWidth: '80vw', minHeight: '60vh'}}>
                <Grid item xs={6}>
                    <Typography display="inline" variant="h4" color={theme.palette.primary.main}>A </Typography>
                    <Typography display="inline" variant="h4">(+ 2 2)</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography display="inline" variant="h4" color={theme.palette.primary.main}>C </Typography>
                    <Typography display="inline" variant="h4">5</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography display="inline" variant="h4" color={theme.palette.primary.main}>B </Typography>
                    <Typography display="inline" variant="h4">4</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography display="inline" variant="h4" color={theme.palette.primary.main}>D </Typography>
                    <Typography display="inline" variant="h4">Not Enough Information</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid justifyContent="center" align-items="center" container>
            <BottomNavigation showLabels sx={{ width: "50vw" }} style={{backgroundColor: theme.palette.primary.main}}>
            <BottomNavigationAction label="Previous" style={{color: "white"}} icon={<ArrowBackIosIcon style={{color: 'white'}}/>} />
            <BottomNavigationAction label="Skip"     style={{color: "white"}} icon={<SkipNextIcon style={{color: "white"}}/>} />
            <BottomNavigationAction label="Grade"    style={{color: "white"}} icon={<CheckIcon style={{color: "white"}}/>} />
            </BottomNavigation>
        </Grid>
    </>
}
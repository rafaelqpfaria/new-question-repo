import React from 'react'
import SideBar from '../components/SideBar'
import HeroSection from '../components/HeroSection' 
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

export default function Dashboard() {
    const classes = useStyles()
    return (

        <div className={classes.root}>
            <SideBar/>            
            <HeroSection/>
            <CssBaseline/>            
            
        </div>
    )
}

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './HeroSection.css';
import FormDialog from './Dialog'
import DialogUser from './DialogUser'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  btnCoolRed: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: theme.spacing(1),
  },
  btnCoolBlue: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: theme.spacing(1),
  }
}))

function HeroSection() {
  const classes = useStyles() 



  return (
    <div className='hero-container'>
      {/* <video src='https://storage.coverr.co/videos/J4bUXbn5RqW02RaZJ1a01UUJbf6nn9bImj?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjIzMDE1NjE4fQ.SI_TD2AxYt05tURQaNRmRJdPh5KbNMxZcxn2ddS-JhM' autoPlay loop muted />      */}

      <h1>CRIATIVIDADE E CONHECIMENTO</h1><br/><br/><br/>      
      <h1>VALEM MUITO</h1>  
      
      <p>O que voçê está esperando?</p>
      <div className='hero-btns'>
        <Button className={classes.btnCoolRed} variant='contained' color='secondary' href='/login' >
          Enviar um item
        </Button>
        <Button className={classes.btnCoolBlue} variant='contained'  color='primary' href='/login'>
          Selecionar um item
        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;

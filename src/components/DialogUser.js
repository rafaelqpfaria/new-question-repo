import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../firebase'
import 'firebase/firestore';
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'
import Disciplines from './Disciplines'
import { ContentContext } from '../Context/ContentContext'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function DialogUser({ tryOpen, tryOpenModal }) {
  const classes = useStyles();  
  const {content , updateContent, updateTopic, topic } = useContext(ContentContext)
  

  const handleClose = () => {
    tryOpenModal()
  };

  const handleClick =() =>{
    localStorage.setItem('content', content)
    localStorage.setItem('topic', topic)
  }



  return (
    <div>

      <Dialog open={tryOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Escolha seu item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione sua questão
          </DialogContentText>
          <form className={classes.root} noValidate autoComplete="off">

            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Displina"
                placeholder="Selecione a disciplina"
                select
                variant="outlined"
                onChange={(event)=>{updateContent(event.target.value)}}
              >
                {Disciplines().map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Tema"
                placeholder="Selecione um tema"
                multiline
                variant="outlined"
                onChange={(event)=>{updateTopic(event.target.value)}}
              />
            </div>                  
          </form>
          {console.log(content,topic)}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClick} href="/querypage" color="primary">
            Selecionar
          </Button>
        </DialogActions>

      </Dialog>


    </div>
  );
}
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import disciplines from './Disciplines'
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase'
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: '25ch',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function FormDialog({ tryOpen, tryOpenModal }) {
  const [collection, setCollection] = useState('')
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [answerFields, setAnswerFields] = useState([
    { id: uuidv4(), content: '' },
    { id: uuidv4(), content: '' },
    { id: uuidv4(), content: '' },
    { id: uuidv4(), content: '' },
    { id: uuidv4(), content: '' }
  ]);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4() }
  ]);
  const [items, setItems] = useState([])

  const ref = firebase.firestore().collection(`Questions`);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    tryOpenModal()
  };

  const addContent = (newQuestion) => {    
    ref
      .doc(newQuestion.name)
      .collection(newQuestion.topic)
      .doc()      
      .set(newQuestion)
      .catch((err) => {
        console.error(err);
      });
    tryOpenModal()
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFields(newInputFields);
    setItems(newInputFields)

  }

  const handleChangeAnswer = (id, event) => {
    const newAnswerFields = answerFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setAnswerFields(newAnswerFields)
    setItems(newAnswerFields)
    
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), content: '' }])
  }

  const handleAddAnswerFields = () => {
    setAnswerFields([...answerFields, { id: uuidv4(), content: '' }])
  }


  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }



  return (
    <div>

      <Dialog
        open={tryOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Inclua seu item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Coloque os itens da sua questao aqui.
          </DialogContentText>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={() => addContent({ name: collection, topic: topic, content: content })}
          >
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Disciplina</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="outlined"
                  multiline
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                >
                  {disciplines().map((item) => (
                    <MenuItem key={item.label} value={item.value} >
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id="outlined-textarea"
                label="Tema"
                placeholder="Selecione um tema"
                multiline
                variant="outlined"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Conteúdo"
                multiline
                rows={4}
                placeholder="Digite o texto"
                variant="outlined"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de Questão</FormLabel>
                <RadioGroup aria-label="Tipo" name="Tipo" value={value} onChange={handleChange}>
                  <FormControlLabel value='Cespe' control={<Radio />} label="Cespe" />
                  <FormControlLabel value='ME' control={<Radio />} label="Multipla Escolha" />
                </RadioGroup>
              </FormControl>
              {value === 'Cespe' &&
                <div>
                  <Container>

                    <form className={classes.root} onSubmit={handleSubmit}>
                      {inputFields.map(inputField => (
                        <div key={inputField.id}>
                          <TextField
                            name="content"
                            label="Questão"
                            variant="outlined"
                            value={inputField.content}
                            onChange={event => handleChangeInput(inputField.id, event)}
                          />
                          <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <RemoveIcon />
                          </IconButton>
                          <IconButton
                            onClick={handleAddFields}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      ))}
                    </form>
                  </Container>
                </div>
              }
              {value === 'ME' &&
                <div>
                  <Container>

                    <form className={classes.root} >
                      {answerFields.map(answerField => (
                        <div key={answerField.id}>
                          <TextField
                            name="content"
                            label="Item"
                            variant="outlined"
                            value={answerField.content}
                            onChange={event => handleChangeAnswer(answerField.id, event)}
                          />
                          
                        </div>
                      ))}
                    </form>
                  </Container>
                </div>
              }
            </div>
          </form>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => addContent({
              name: collection,
              topic: topic,
              content: content,
              type: value,              
              itens: items,              
              id: uuidv4()
            })}
            type="submit"
            color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
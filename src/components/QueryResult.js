import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase"
import { ContentContext } from '../Context/ContentContext'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function QueryResult() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { content, updateContent, updateTopic, topic } = useContext(ContentContext)
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    updateContent(localStorage.getItem('content'))
    updateTopic(localStorage.getItem('topic'))
    handleSelect(localStorage.getItem('content'), localStorage.getItem('topic'))
  }, [])

  const ref = firebase.firestore().collection(`Questions`);

  function handleSelect(question, theme) {
    setLoading(true);
    if(theme === undefined){
      ref.doc(question).onSnapshot((querySnapshot) => {

        const itemsNotDef = [];
        querySnapshot.forEach((doc) => {
  
          itemsNotDef.push(doc.data());
  
        });
        setQuestions(itemsNotDef);
      })
      console.log(questions)
      return 
    }

    
    ref.doc(question).collection(theme).onSnapshot((querySnapshot) => {

      const items = [];
      querySnapshot.forEach((doc) => {

        items.push(doc.data());

      });
      setQuestions(items);
      setLoading(false);      
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {console.log(questions)}
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Questões encontradas
                </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {/*/Encontramos {//questions.length} questões de {questions[0].name} com o tema {questions[0].topic}*/}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Pesquisar outro tema
                      </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Enviar uma questão
                      </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {questions.map((question) => (
              <Grid item key={question.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={question.topic}
                  />
                  {console.log('question',question.itens)}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {question.topic}
                    </Typography>
                    <Typography>
                      {question.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                        </Button>
                    <Button size="small" color="primary">
                      Edit
                        </Button>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Alternativas</FormLabel>
                          <RadioGroup aria-label="alternatives" name="alternatives" value={value} onChange={handleChange}>
                            <FormControlLabel value='oi' control={<Radio />} label='oi'/>
                            <FormControlLabel value='oi' control={<Radio />} label='oi'/>
                            <FormControlLabel value='oi' control={<Radio />} label='oi'/>
                            
                          </RadioGroup>
                        </FormControl>
                      

                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
            </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
            </Typography>

      </footer>
      {/* End footer */}
    </React.Fragment>
  );


}

export default QueryResult;



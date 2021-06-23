import React ,{ useState }from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import CespeQuestion from './CespeQuestion'


export default function RadioButtonsGroup() {
    const [value, setValue] = useState('');
    const [answerA, setAnswerA] = useState('');
    const [answerB, setAnswerB] = useState('');
    const [answerC, setAnswerC] = useState('');
    const [answerD, setAnswerD] = useState('');
    const [answerE, setAnswerE] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de Questão</FormLabel>
                <RadioGroup aria-label="Tipo" name="Tipo" value={value} onChange={handleChange}>
                    <FormControlLabel value='Cespe' control={<Radio />} label="Cespe" />
                    <FormControlLabel value='ME' control={<Radio />} label="Multipla Escolha" />
                </RadioGroup>
            </FormControl>
            {value === 'Cespe' &&
                <div>
                    <CespeQuestion/>
                </div>
            }
            {value === 'ME' &&
                <div>
                    <TextField
                        id="outlined-textarea"
                        label="A"
                        placeholder="Digite o texto do item"
                        multiline
                        variant="outlined"
                        onChange={(e) => setAnswerA(e.target.value)}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="B"
                        placeholder="Digite o texto do item"
                        multiline
                        variant="outlined"
                        onChange={(e) => setAnswerB(e.target.value)}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="C"
                        placeholder="Digite o texto do item"
                        multiline
                        variant="outlined"
                        onChange={(e) => setAnswerC(e.target.value)}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="D"
                        placeholder="Digite o texto do item"
                        multiline
                        variant="outlined"
                        onChange={(e) => setAnswerD(e.target.value)}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="E"
                        placeholder="Digite o texto do item"
                        multiline
                        variant="outlined"
                        onChange={(e) => setAnswerE(e.target.value)}
                    />
                </div>
            }
        </>
    );
}
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './HeroSection.css';
import SimpleModal from './Modal'
import FormDialog from './Dialog'

function HeroSection() {
  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(!modal)
  }

  return (
    <div className='hero-container'>
      <video src='https://www.youtube.com/watch?v=BZL0kiyjbyo' autoPlay loop muted />
      
      <h1>CRIATIVIDADE E CONHECIMENTO</h1><br/><br/><br/>
      
      <h1>VALEM MUITO</h1>
      
      
      <p>O que voçê está esperando?</p>
      <div className='hero-btns'>
        <Button onClick={openModal} variant="contained" color="inherit" >
          Começe agora
        </Button>
        <Button variant="contained" color="primary">
          Veja um tutorial
        </Button>
        {modal ? <FormDialog tryOpen={modal} tryOpenModal = {openModal} /> : null }
      </div>
    </div>
  );
}

export default HeroSection;

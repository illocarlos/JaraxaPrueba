import { useState } from 'react';
import Form from '../src/components/Form';
import CardMedical from './components/CardMedical';
import Button from '@mui/material/Button';
import ModalComponent from './components/ModalComponent';
import Modal from 'react-modal';
import './App.css';
// Define el elemento principal de la aplicación para accesibilidad
Modal.setAppElement('#root');

function App() {
  const [useshowForm, setShowForm] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectMedically, setSelectMedically] = useState({});

  const showModalForm = () => {
    setShowForm(!useshowForm);
  };

  const openModal = (medically) => {
    setSelectMedically(medically);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectMedically({});
  };

  return (
    <div className='flex   justify-center  ' id='root'>

      <div className='fixed z-10 top-52 left-10'>
        {!useshowForm ?
          <Button onClick={showModalForm} variant="contained">search medically</Button>
          :
          <Form showModalForm={showModalForm} />
        }
      </div>

      <div className='w-5/5 container'>

        <CardMedical openModal={openModal} />
      </div>
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectMedically={selectMedically}
      />
    </div>
  );
}

export default App;

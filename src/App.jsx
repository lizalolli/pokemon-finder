import { useState } from 'react'
import { MiApi } from './components/MiApi'
import { Buscador } from './components/Buscador';
import './App.css'

function App() {
  //const [filtro, setFiltro] = useState('');

  // const handleLimpiar = () => {
  //   setFiltro('');
  // };

  return (
    <>
      {/* <MiApi filtro={filtro} /> */}
      <MiApi />
    </>
  )
}

export default App

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

export const Buscador = ({ pokemones, buscador, setBuscador }) => {
    
    const handleLimpiarClick = () => {
      setBuscador('');
    };

    console.log(pokemones)



  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar Pokemon"
          aria-label="Buscar Pokemon"
          aria-describedby="basic-addon2"
          value={buscador}
          onChange={(e) => setBuscador(e.target.value)}
        />
        {/* <Button variant="outline-secondary" id="button-addon2" onChange={handleLimpiarClick}>
          Buscar
        </Button> */}
        <Button variant="outline-secondary" id="button-addon2" onClick={handleLimpiarClick}>Limpiar búsqueda</Button>
      </InputGroup>
    </>
  )
}

Buscador.propTypes = {
    pokemones: PropTypes.array.isRequired,
    setPokemones: PropTypes.array.isRequired,
    buscador: PropTypes.string.isRequired,
    setBuscador: PropTypes.string.isRequired,
  };

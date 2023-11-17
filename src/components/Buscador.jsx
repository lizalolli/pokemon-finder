import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const Buscador = ({ pokemones, buscador, setBuscador }) => {
    const handleLimpiarClick = () => {
        setBuscador("");
    };
    
    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Find Pokemon"
                    aria-label="Find Pokemon"
                    aria-describedby="basic-addon2"
                    value={buscador}
                    onChange={(e) => setBuscador(e.target.value)}
                />
                <Button
                    style={{
                        backgroundColor: "#4754CD",
                        border: "none",
                        fontSize: "20px",
                        fontWeight: '600'
                    }}
                    id="button-addon2"
                    onClick={handleLimpiarClick}
                >
                    Clear
                </Button>
            </InputGroup>
        </>
    );
};

Buscador.propTypes = {
    pokemones: PropTypes.array.isRequired,
    setPokemones: PropTypes.array.isRequired,
    buscador: PropTypes.string.isRequired,
    setBuscador: PropTypes.string.isRequired,
};

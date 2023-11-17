import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Buscador } from "./Buscador";
import { Card, Col, Row } from "react-bootstrap";

const urlApi = "https://pokeapi.co/api/v2/pokemon";

export const MiApi = () => {
    const [pokemones, setPokemones] = useState([]);
    const [buscador, setBuscador] = useState("");

    const traerCaractPokemones = async (url) => {
        try {
            const response = await axios.get(url);
            console.log(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching Pokemon details:", error);
        }
    };
    const traerPokemones = async () => {
        try {
            const response = await axios(urlApi);
            const results = response.data.results;

            const pokemonesConCaract = await Promise.all(
                results.map(async (pokemon) => {
                    const caract = await traerCaractPokemones(
                        pokemon.url
                    );
                    return { ...pokemon, caract };
                })
            );
            setPokemones(pokemonesConCaract);
        } catch (error) {
            console.error("Error fetching Pokemon list:", error);
        }
    };

    useEffect(() => {
        traerPokemones();
    }, []);

    return (
        <>
            <Buscador
                pokemones={pokemones}
                setPokemones={setPokemones}
                buscador={buscador}
                setBuscador={setBuscador}
            />
            {pokemones
                .filter((pokemon) => {
                  return (
                    pokemon.name.toLowerCase().includes(buscador.toLowerCase()) ||
                    pokemon.caract.types[0].type.name.toLowerCase().includes(buscador.toLowerCase())
                  );                })
                .map((pokemon) => (
                    <div key={pokemon.name}>
                        {/* <h3>{pokemon.name}</h3>
                        <img
                            src={pokemon.caract.sprites.front_default}
                            alt=""
                        /> */}
                        <Row xs={1} md={2} className="g-4">
                          
                            <Col>
                              <Card>
                                <Card.Img variant="top" src={pokemon.caract.sprites.front_default} />
                                <Card.Body>
                                  <Card.Title>{pokemon.name}</Card.Title>
                                  {/* <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                  </Card.Text> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          
                        </Row>
                    </div>
                ))}
        </>
    );
};

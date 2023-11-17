import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Buscador } from "./Buscador";
import { Card, Col, Row, Spinner } from "react-bootstrap";

const urlApi = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150";

export const MiApi = () => {
    const [pokemones, setPokemones] = useState([]);
    const [buscador, setBuscador] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
                    const caract = await traerCaractPokemones(pokemon.url);
                    return { ...pokemon, caract };
                })
            );
            setPokemones(pokemonesConCaract);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching Pokemon list:", error);
            setIsLoading(false);
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
            {isLoading ? (
                <Spinner 
                    animation="border" 
                    variant="info" 
                    className="mt-5"
                />
            ) : (
                <Row xs={1} sm={2} md={4} className="g-4">
                    {pokemones
                        .filter((pokemon) => {
                            return (
                                pokemon.name
                                    .toLowerCase()
                                    .includes(buscador.toLowerCase()) ||
                                pokemon.caract.types[0].type.name
                                    .toLowerCase()
                                    .includes(buscador.toLowerCase())
                            );
                        })
                        .map((pokemon) => (
                            <Col key={pokemon.name}>
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={
                                            pokemon.caract.sprites.front_default
                                        }
                                    />
                                    <Card.Body>
                                        <Card.Title><h3 style={{color: '#474554'}}><strong>{pokemon.name}</strong></h3></Card.Title>
                                        <Card.Text style={{color: '#474554'}}>
                                            This pokemon is{" "}
                                            <strong>
                                                {
                                                    pokemon.caract.types[0].type
                                                        .name
                                                }
                                            </strong>{" "}
                                            type
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            )}
        </>
    );
};

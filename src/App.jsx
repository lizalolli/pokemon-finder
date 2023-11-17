import React from "react";
import { MiApi } from "./components/MiApi";
import "./App.css";

function App() {

    return (
        <>
            <div className="container-fluid">
                <div className="pokemon-container">
                    <h1 
                    style={{color: '#4754CD'}}
                    className="mb-5"
                    >
                      Pokemon finder
                    </h1>
                    <MiApi />
                </div>
            </div>
        </>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import "./home.css";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';

export default function Home () {
    
    const [operation, setOperation] = useState(0);
    const [categories, setCategories] = useState(null)

    const history = useHistory();

    useEffect (()=> {
        axios.get("/operations")
        .then (res => setOperation(res))

        axios.get("/categories")
        .then (res => setCategories(res))
    }, [])

    var lastOperations = operation!== 0? operation.data.slice(operation.data.length-10, operation.data.length) : []
    var lastOperations = lastOperations.reverse()

    var entry = operation!==0? operation.data.filter(el => el.type==="ingreso") : null
    var expensives = operation!==0? operation.data.filter(el=> el.type === "egreso") : null

    var entryReduce = operation!==0? entry.reduce(function(contador, entry){return contador + Number(entry.amount)},0) : null
    var expensivesReduce = operation!==0? expensives.reduce(function(contador, expensives){return contador + Number(expensives.amount)},0) : null;

    return (
        <div>
            {lastOperations.length === 0?
            <div className = "containerHomeDiv">
            <h1>Balance de presupuesto personal.</h1>
            <h2>Ingrese su presupuesto aquí</h2>
            </div>
            :
            <div className = "containerHomeDiv">
            <h1>Balance de presupuesto personal.</h1>
            <h3>Últimas Operaciones:</h3>
            
            {lastOperations ?

            lastOperations.map(el => 
            <div className = "containerEntryDiv">
            <h1>{el.type}</h1> 
            <p>{el.amount} {el.description} {el.categoryId}</p>
            <h6>{el.date}</h6>
            </div>)

            :
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            }

            <h1>TOTAL INGRESOS:{entryReduce}</h1>
            <h2>TOTAL EGRESOS: {expensivesReduce}</h2>
            <h2>BALANCE FINAL{entryReduce - expensivesReduce}</h2>

            <button onClick = {()=>{history.push("/abm")}}>Modificar presupuesto</button>
        </div>
            }
        </div>
    )
}
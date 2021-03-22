import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import "./home.css";
import axios from "axios";
import TotalFinances from "../../components/TotalFinances/TotalFinances";
import Operations from "../../components/Operations/Operations";

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
        <div className = "containerHomeDiv">

            <TotalFinances entryReduce={entryReduce} expensivesReduce={expensivesReduce}/>
            <Operations lastOperations={lastOperations}/>

            <button onClick = {()=>{history.push("/abm")}}>Modificar presupuesto</button>
        </div>
    )
}
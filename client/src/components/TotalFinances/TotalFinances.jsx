import React, {useState, useEffect} from "react";
import axios from "axios";
import "./totalfinances.css";

export default function TotalFinances () {

    const [operation, setOperation] = useState(0);
    const [categories, setCategories] = useState(null)

    useEffect (()=> {
        axios.get("/operations")
        .then (res => setOperation(res))

        axios.get("/categories")
        .then (res => setCategories(res))
    }, [])

    var entry = operation!==0? operation.data.filter(el => el.type==="ingreso") : null
    var expensives = operation!==0? operation.data.filter(el=> el.type === "egreso") : null

    var entryReduce = operation!==0? entry.reduce(function(contador, entry){return contador + Number(entry.amount)},0) : null
    var expensivesReduce = operation!==0? expensives.reduce(function(contador, expensives){return contador + Number(expensives.amount)},0) : null;


    return (
           <div className = "totalFinancesContainer">
            <h1 className = "myFinancesApp">MY FINANCES APP</h1>
            <h3 className = "fontFinances">MIS INGRESOS:<h2>$ {entryReduce}</h2></h3>
            <h3 className = "fontFinances">MIS GASTOS: <h2>$ {expensivesReduce}</h2></h3>
            <h3 className = "fontFinances">BALANCE: <h2>$ {entryReduce - expensivesReduce}</h2></h3>
            </div>)
}
import React from "react";
import "./totalfinances.css";

export default function TotalFinances (props) {
    return (
           <div className = "totalFinancesContainer">
            <h1>MY FINANCES APP</h1>
            <h3>Ingresos totales:{props.entryReduce}</h3>
            <h3>Tus egresos: {props.expensivesReduce}</h3>
            <h3>Balance:{props.entryReduce - props.expensivesReduce}</h3>
            </div>)
}
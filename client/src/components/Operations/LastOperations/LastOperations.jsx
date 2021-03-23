import React from "react";
import "./lastoperations.css";

export default function Operations (props) {

    return (<div>
            <h3>Últimas operaciones ingresadas:</h3>
            
            {props.lastOperations.length !== 0 ?
            props.lastOperations.map(el => 
            <div className = "containerEntryDiv">
            <h1>{el.type}</h1> 
            <p>{el.amount} {el.description} {el.categoryId}</p>
            <h6>{el.date}</h6>
            </div>)

            :
            <h4>Todavia no ha registrado ninguna operación</h4>
            }
            </div>)
}
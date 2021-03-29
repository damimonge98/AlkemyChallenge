import React, {useState, useEffect } from "react";
import "./lastoperations.css";
import axios from "axios";

export default function Operations (props) {
    const [categories, setCategories] = useState([]);

    useEffect (()=> {
        axios.get("/categories")
        .then (categories => setCategories(categories.data))
    },[])

    return (<div>
            <h3>Últimas operaciones ingresadas:</h3>
            
            {props.lastOperations.length !== 0 ?
            props.lastOperations.map(el => 
            <div className = "containerLastOperationDiv">
            <h6>{el.date}</h6>
            <h1 className ="h1Amount">{el.type === "ingreso"? "+" : "-"} ${el.amount}</h1> 
            <h3>{el.description}</h3>
            <h6> {categories[el.categoryId-1].name}</h6>
            </div>)

            :
            <h4>Todavia no ha registrado ninguna operación</h4>
            }
            </div>)
}
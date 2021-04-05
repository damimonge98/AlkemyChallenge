import React, {useState, useEffect } from "react";
import "./lastoperations.css";
import axios from "axios";
import { FaPlaneDeparture, FaTasks, FaPizzaSlice, FaClinicMedical, FaShoppingCart, FaBus, FaRegSmileBeam, FaFilter, FaBell} from 'react-icons/fa';
import {FontAwesome, FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";

export default function Operations () {
    const [categories, setCategories] = useState([]);
    const [operation, setOperation] = useState(0);

    useEffect (()=> {
        axios.get("/operations")
        .then (res => setOperation(res))
        
        axios.get("/categories")
        .then (categories => setCategories(categories.data))
    },[])

    var lastOperations = []
    
    var lastOperations = operation!== 0? operation.data: []
    lastOperations = lastOperations.length >= 10 ? lastOperations.slice(operation.data.length-10, operation.data.length) : lastOperations
    lastOperations = lastOperations.reverse()

    console.log("lastOperations", lastOperations)
    console.log("categories", categories)
    console.log("operations", operation)

    return (<div className = "containerLastOperationsDiv">

            <div className = "headerDiv">
            <h3 className = "h3title">TUS ÚLTIMAS OPERACIONES:</h3>
            <FontAwesomeIcon icon = {faFilter} size = "lg" className = "filterIcon"/>
            </div>

            {lastOperations.length !== 0 ?
            lastOperations.map(el => 
            <div className = "lastOperationDiv">
            {!categories || categories.length === 0?
            null
            :
            <div className = "infoOperationDiv">
            
            {categories[el.categoryId-1].name === "otro"?
            <FaTasks size = "5%" style = {{marginTop:"2%", marginLeft: "1%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "vacaciones"?
            <FaPlaneDeparture size = "5%" style = {{marginTop:"2%", marginLeft: "1%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "restaurantes"?
            <FaPizzaSlice size = "5%" style = {{marginTop:"2%", marginLeft: "1%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "salud"?
            <FaClinicMedical size = "5%" style = {{marginTop:"2%", marginLeft: "1%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "compras"?
            <FaShoppingCart size = "5%" style = {{marginTop:"2%", marginLeft: "1%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "transporte"?
            <FaBus size = "5%" style = {{marginTop:"2%", marginLeft: "1%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "entretenimiento"?
            <FaRegSmileBeam size = "5%" style = {{marginTop:"2%", marginLeft: "1%"}}/>
            :
            null}
            <p>Fecha:  {el.date}</p>
            <p>{el.description}</p>
            <p className = "operationType" style = {el.type === "ingreso"? {color: "green"} : {color: "red"}}>{el.type === "ingreso"? "+" : "-"} ${el.amount}</p>
            </div>
            }
            </div>)

            :
            <h4>Todavia no ha registrado ninguna operación</h4>
            }
            </div>)
}
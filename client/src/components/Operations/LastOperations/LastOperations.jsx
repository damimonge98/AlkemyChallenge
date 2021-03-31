import React, {useState, useEffect } from "react";
import "./lastoperations.css";
import axios from "axios";
import { FaPlaneDeparture, FaTasks, FaPizzaSlice, FaClinicMedical, FaShoppingCart, FaBus, FaRegSmileBeam} from 'react-icons/fa';


export default function Operations (props) {
    const [categories, setCategories] = useState([]);

    useEffect (()=> {
        axios.get("/categories")
        .then (categories => setCategories(categories.data))
    },[])
    
    return (<div className = "containerLastOperationsDiv">
            <h3 className = "h3title">Últimas operaciones ingresadas:</h3>

            {props.lastOperations.length !== 0 ?
            props.lastOperations.map(el => 
            <div className = "lastOperationDiv">
            <div className = "infoOperationDiv">

            {categories[el.categoryId-1].name === "otro"?
            <FaTasks size = "5%" style = {{marginTop:"3%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "vacaciones"?
            <FaPlaneDeparture size = "5%" style = {{marginTop:"3%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "restaurantes"?
            <FaPizzaSlice size = "5%" style = {{marginTop:"3%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "salud"?
            <FaClinicMedical size = "5%" style = {{marginTop:"3%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "compras"?
            <FaShoppingCart size = "5%" style = {{marginTop:"3%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "transporte"?
            <FaBus size = "5%" style = {{marginTop:"3%"}}/>
            :
            null}

            {categories[el.categoryId-1].name === "entretenimiento"?
            <FaRegSmileBeam size = "5%" style = {{marginTop:"3%"}}/>
            :
            null}

            <p>{el.description}</p>
            <p className = "operationType" style = {el.type === "ingreso"? {color: "green"} : {color: "red"}}>{el.type === "ingreso"? "+" : "-"} ${el.amount}</p>
            </div>
            </div>)

            :
            <h4>Todavia no ha registrado ninguna operación</h4>
            }
            </div>)
}
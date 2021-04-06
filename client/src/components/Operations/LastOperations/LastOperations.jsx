import React, {useState, useEffect, Fragment } from "react";
import "./lastoperations.css";
import axios from "axios";
import { FaPlaneDeparture, FaTasks, FaPizzaSlice, FaClinicMedical, FaShoppingCart, FaBus, FaRegSmileBeam, FaFilter, FaBell} from 'react-icons/fa';
import {FontAwesome, FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

export default function Operations () {
    const [categories, setCategories] = useState([]);
    const [operation, setOperation] = useState(0);
    const [filter, setFilter] = useState(false);
    const [filterCategories, setFilterCategories] = useState([]);
    const [check, setCheck] = useState(false)
    const [id, setCategoryId] = useState([])

    useEffect (()=> {
        axios.get("/operations")
        .then (res => setOperation(res))
        
        axios.get("/categories")
        .then (categories => setCategories(categories.data))
    },[])

    //Handlers para filtrado de categorías
    const filterHandler = function () {
        setFilter(!filter)
        setFilterCategories([])
    }

    const filterCategoriesHandler = function (id) {

            if (filterCategories.includes(id)) {
                setCheck(!check)

                console.log("check inside", check)
                var spliceCategories = filterCategories
                spliceCategories.splice(spliceCategories.indexOf(id), 1)
                setFilterCategories(spliceCategories)
                return;
            } 
            else {
                setFilterCategories([...filterCategories, id])
                return;
            }
        }

        
    
    //Manejo de ultimas 10 operaciones
    var lastOperations = []
    var lastOperations = operation!== 0? operation.data: []
    lastOperations = lastOperations.length >= 10 ? lastOperations.slice(operation.data.length-10, operation.data.length) : lastOperations
    lastOperations = lastOperations.reverse()

    //Condicional para filtrar 
    if (filterCategories.length !== 0) {
        var newArray = []
        for (var i = 0; i < filterCategories.length; i ++) {
        lastOperations.filter(el => el.categoryId === filterCategories[i]).map(el => newArray.push(el))
        }
        lastOperations = newArray;
    }

    console.log("filterCategories", filterCategories);
    console.log("lastOperations", lastOperations)
    console.log("categories", categories)
    console.log("check fuera", check)

    return (<div className = "containerLastOperationsDiv">

            <div className = "headerDiv">
            <h3 className = "h3title">TUS ÚLTIMAS OPERACIONES:</h3>
            <FontAwesomeIcon icon = {faFilter} size = "lg" className = "filterIcon" onClick = {filterHandler}/>
            </div>

            {filter === false? null : 
            <Fragment>
                <div>
                    {categories.length === 0? null 
                    : categories.map(el => 
                        <Fragment>
                        <input type="checkbox" onClick = {()=>{filterCategoriesHandler(el.id)}}/>
                        <label>{el.name.charAt(0).toUpperCase() + el.name.substring(1)}</label>
                        </Fragment>
                   )}
                    
                </div>
            </Fragment>}


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
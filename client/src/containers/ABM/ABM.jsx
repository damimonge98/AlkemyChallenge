import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ABM.css";
import NewOperation from "../../components/Forms/NewOperation/NewOperation";
import AllOperations from "../../components/Operations/AllOperations/AllOperations";
import Button from "../../components/Button/Button";
import TotalFinances from "../../components/TotalFinances/TotalFinances";



export default function ABM () {
 
    
    const [operation, setOperation] = useState([]);
    const [categories, setCategories] = useState ([])
    const history = useHistory();
    
    useEffect (()=> {
        axios.get("/operations")
        .then (res => setOperation(res.data.reverse()))
        axios.get("/categories")
        .then (res => setCategories(res))
    }, [])

    var reverseOperations = operation
    console.log("reverseOperations", reverseOperations)
    console.log("operation", operation)
    return (
            <div className = "divABM">
                <TotalFinances/>
                <Button info = "HOME" onClick = "/"/>
                <NewOperation operation = {operation} categories = {categories}/> 
                <AllOperations operation = {operation} categories = {categories}/>
            </div>
        
    )

}
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ABM.css";
import NewOperation from "../../components/Forms/NewOperation/NewOperation";
import AllOperations from "../../components/Operations/AllOperations/AllOperations";



export default function ABM () {
 
    
    const [operation, setOperation] = useState([]);
    const [categories, setCategories] = useState ([])
    const history = useHistory();
    
    useEffect (()=> {
        axios.get("/operations")
        .then (res => setOperation(res))
        axios.get("/categories")
        .then (res => setCategories(res))
    }, [])

    return (
            <div>
                <NewOperation operation = {operation} categories = {categories}/> 
                <AllOperations operation = {operation}/>
                <button onClick = {()=>{history.push("/")}}>HOME</button>
            </div>
        
    )

}
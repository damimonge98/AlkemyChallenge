import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ABM.css";
import NewOperation from "../../components/Forms/NewOperation";
import AllOperations from "../../components/Operations/AllOperations/AllOperations";



export default function ABM () {
 
    
    const [operation, setOperation] = useState([]);
    const history = useHistory();
    
    useEffect (()=> {
        axios.get("/operations")
        .then (res => setOperation(res))
    }, [])

    return (
            <div>
                <NewOperation operation = {operation}/> 
                <AllOperations operation = {operation}/>
                <button onClick = {()=>{history.push("/")}}>HOME</button>
            </div>
        
    )

}
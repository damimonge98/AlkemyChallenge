import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ABM.css";
import CurrencyInput from 'react-currency-input-field';


export default function ABM () {
    const [data, setData] = useState({
        type: "ingreso",
        amount: "",
        description: "",
        date: "",
    })
    
    const [operation, setOperation] = useState([]);
    const history = useHistory();
    
    useEffect (()=> {
        axios.get("/operations")
        .then (res => setOperation(res))
    }, [])

    //handlers

    function onChange (e) {
    setData ({
        ...data,
        [e.target.name] : e.target.value
    })}

    function onSubmit (event) {
        event.preventDefault();
        setData({
            ...data,
            amount: data.amount.replace("$"," "),
            type: data.type.toLowerCase()
        })
        
        axios.post("/operations",data)
    }

    console.log(data)

    return (
        <div>
            <div>
            <h1>Registrar nueva operación</h1>
            <form>
                <label>Tipo</label>
                <select onChange = {onChange} name = "type"  defaultValue = "Ingreso">
                    <option>Ingreso</option>
                    <option>Egreso</option>
                </select>

                <label>Monto</label>
                <CurrencyInput
                    onChange={onChange}
                    name="amount"
                    prefix="$"
                    placeholder="$0"
                    defaultValue={0}
                    allowDecimals={true}
                    defaultValue={0}
                    decimalsLimit={2}
                    groupSeparator = ','
                    decimalSeparator= '.'
                />;



                <label>Concepto</label>
                <input onChange = {onChange} name = "description"/>
                <label>Fecha</label>
                <input type = "date"onChange = {onChange} name = "date"/>
                <label>Categoría</label>
                <select onChange = {onChange} name = "category">
                    <option selected>Otro</option>
                    <option>Entretenimiento</option>
                    <option>Vacaciones</option>
                    <option>Salud</option>
                    <option>Compras</option>
                    <option>Restaurantes</option>
                    <option>Transporte</option>
                </select>
                <button onClick={onSubmit}>OK</button>
                </form>
                </div>

            <div>
                <h1>Tus movimientos</h1>
                <div>

                    {operation.length === 0?
                    null
                    :
                    operation.data.map(el => 
                    <div className = "divContainerAllOperations"> 
                    <h1>{el.amount}</h1>
                    <h2>{el.type}</h2>
                    <h3>{el.description}</h3>
                    <h4>{el.date}</h4>
                    </div>
                    )}
                </div>
                <button onClick = {()=>{history.push("/")}}>HOME</button>
            </div>

        </div>
        
    )

}
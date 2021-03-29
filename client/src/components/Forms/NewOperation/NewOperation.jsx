import React, {useState} from "react";
import CurrencyInput from 'react-currency-input-field';
import axios from "axios";


export default function NewOperation () {
    const [data, setData] = useState({
        type: "ingreso",
        amount: "",
        description: "",
        date: "",
    })

        //handlers

        function onChange (e) {
            var targetData = e.target.value
            targetData = e.target.value.replace("$","")
            targetData = targetData.toLowerCase()

            setData ({
                ...data,
                [e.target.name] : targetData
            })}
        
            function onSubmit (event) {
                axios.post("/operations",data)
            }

    return (
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
                        placeholder="$0"
                        defaultValue={0}
                        allowDecimals={true}
                        defaultValue={0}
                        prefix = {"$"}
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
                    </div>)}
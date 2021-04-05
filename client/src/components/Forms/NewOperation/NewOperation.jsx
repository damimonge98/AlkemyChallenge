import React, {useState, useEffect} from "react";
import CurrencyInput from 'react-currency-input-field';
import axios from "axios";


export default function NewOperation (props) {
    const [data, setData] = useState({
        type: "ingreso",
        amount: "",
        description: "",
        date: "",
    })

    const [category, setCategory] = useState({
        name: "otro"
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
        
        function onChangeCategory (e) {
            var targetData = e.target.value
            targetData = targetData.toLowerCase()
            e.preventDefault()
            setCategory({
                ...category,
                [e.target.name] : targetData
            })

        }

         function checkSubmit () {
            //Verifica si el arreglo de categorías está vacio o si no existe, y si lo está crea una por default
            if (props.categories.data.length === 0 || !props.categories.data) {
                axios.post("/categories/", {name: "otro"})

                if (category.name !== "otro") {
                    axios.post("/categories/", category)
                    .then(res => window.categoryId = res.data.id)
                }
                window.categoryId = 1;
                return;
            }
            //En caso que haya categorías en el arreglo, compara si hay alguna existente. Caso afirmativo,
            //sale de la funcion, de otra forma realiza  un post con la nueva categoría.
            for (var i = 0; i < props.categories.data.length; i++) {

                if (props.categories.data[i].name === category.name) {
                window.categoryId = props.categories.data[i].id
                return;
                } 
            }    
             axios.post("/categories/", category)
            .then(res => window.categoryId = res.data.id)
        }

         function onSubmitData () {
             axios.post("/operations", data)
            .then(res => window.operationId = res.data.operationId)
        }

         function updateData () {
            axios.post(`/operations/${window.operationId}/${window.categoryId}`)
            window.location.reload()
        }

         function handleSubmit (event) {
            event.preventDefault()
            checkSubmit();
            setTimeout(onSubmitData, 1000);
            setTimeout(updateData,2000)
        }

    return (
            <div style = {{margin : "auto"}}>
                <h1 style = {{textAlign : "center"}}>Nueva operación</h1>
                <form  onSubmit={handleSubmit}>
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
                    <select onChange = {onChangeCategory} name = "name">
                        <option selected>Otro</option>
                        <option>Entretenimiento</option>
                        <option>Vacaciones</option>
                        <option>Salud</option>
                        <option>Compras</option>
                        <option>Restaurantes</option>
                        <option>Transporte</option>
                    </select>
                    <button type = "submit">OK</button>
                    </form>
                    </div>)}
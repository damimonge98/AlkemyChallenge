import React, {useState, Fragment} from "react";
import "./alloperations.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

export default function AllOperations (props) {

    const [filter, setFilter] = useState(false)
    const [filteredArray, setFilteredArray] = useState([])
    const [entryType, setEntryType] = useState(null)
    const [edit, setEdit] = useState(false)
    
    const filterHandler = function () {
        if (filter === true) {
            setFilteredArray([])
            setFilter(!filter)
            return;
        }
        setFilter(!filter)
    }

    const filterType = function (type) {
        if (entryType !== type) {
            setEntryType(type)
        } else {
            setEntryType(null)
            setFilteredArray([])
            return;
        }
       
        var array = props.operation.filter(el => el.type === type)
        setFilteredArray(array)
    }

    const editHandler = function () {
        setEdit(!edit)
    }

    return (<div className = "allOperationsDiv">
        <div className = "headerDiv">
        <h3 className = "h3Title"> MIS MOVIMIENTOS</h3>
        <FontAwesomeIcon icon = {faFilter} size = "lg" className = "filterIcon" onClick = {filterHandler}/>
        </div>
        {filter === false? null:
        <div>
            <input type= "checkbox" onClick = {()=>{filterType("ingreso")}}></input>
            <label>Ingresos</label>
            <input type= "checkbox" onClick = {()=>{filterType("egreso")}}></input>
            <label>Egresos</label>
        </div>
        }
                <div>

                    {!props.operation || props.operation.length === 0?
                    null
                    :
                    filteredArray.length === 0?
                    <div className = "divContainerAllOperations"> 
                    <table className = "table">
                        <tr>
                            <th className = "thTable">Fecha</th>
                            <th className = "thTable">Tipo</th>
                            <th className = "thTable">Monto $</th>
                            <th className = "thTable">Concepto</th>
                            <th className = "thTable">Categoría</th>
                            <th className = "thTable"></th>
                        </tr>
                        {props.operation.map(el => 
                        
                        <tr>
                                
                                <td className = "tdTable">{el.date}</td>
                                <td className = "tdTable">{el.type}</td>
                                <td className = "tdTable">{el.amount}</td>
                                <td className = "tdTable">{el.description}</td>
                                <td className = "tdTable">{props.categories.data? props.categories.data[el.categoryId-1].name : ""}</td>
                                <td className = "edit" onClick = {editHandler}>...</td>
                        </tr>        
                               
                            )}
                        
                    </table>
                    </div>
                    :

                    //Filtrado por tipo de movimiento
                    <div className = "divContainerAllOperations"> 
                    <table className = "table">
                        <tr>
                            <th className = "thTable">Fecha</th>
                            <th className = "thTable">Monto $</th>
                            <th className = "thTable">Concepto</th>
                            <th className = "thTable">Categoría</th>
                        </tr>
                        {filteredArray.map(el => 
                        
                        <tr>
                                
                                <td className = "tdTable">{el.date}</td>
                                <td className = "tdTable">{el.amount}</td>
                                <td className = "tdTable">{el.description}</td>
                                <td className = "tdTable">{props.categories.data? props.categories.data[el.categoryId-1].name : ""}</td>
                        </tr>        
                               
                            )}
                        
                    </table>
                    </div>
                    
                    }
                    </div>

    </div>)
}
import React, {useState, Fragment} from "react";
import "./alloperations.css";

export default function AllOperations (props) {
    console.log(props.operation, "props")
    console.log("props.categories", props.categories.data)

    return (<div className = "allOperationsDiv">
        <h1 style = {{textAlign : "center"}}>Mis movimientos</h1>
                <div>

                    {!props.operation || props.operation.length === 0?
                    null
                    :
                    
                    <div className = "divContainerAllOperations"> 
                    <table className = "table">
                        <tr>
                            <th className = "thTable">Fecha</th>
                            <th className = "thTable">Tipo</th>
                            <th className = "thTable">Monto $</th>
                            <th className = "thTable">Concepto</th>
                            <th className = "thTable">Categoría</th>
                        </tr>
                        {props.operation.map(el => 
                        
                        <tr>
                                
                                <td className = "tdTable">{el.date}</td>
                                <td className = "tdTable">{el.type}</td>
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
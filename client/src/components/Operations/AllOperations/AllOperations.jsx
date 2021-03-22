import React from "react";
import "./alloperations.css";

export default function AllOperations (props) {
    return (<div>
        <h1>Tus movimientos</h1>
                <div>

                    {props.operation.length === 0?
                    null
                    :
                    props.operation.data.map(el => 
                    <div className = "divContainerAllOperations"> 
                    <h1>{el.amount}</h1>
                    <h2>{el.type}</h2>
                    <h3>{el.description}</h3>
                    <h4>{el.date}</h4>
                    </div>
                    )}
                    </div>

    </div>)
}
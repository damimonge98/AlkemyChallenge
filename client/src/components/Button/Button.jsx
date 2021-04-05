import React from "react";
import {useHistory} from "react-router-dom";
import "./button.css";


export default function Button (props) {

    const history = useHistory();
    return (
        <div className = "buttonDiv" onClick = {()=>{history.push(props.onClick)}}> <p className = "buttonInfo">{props.info}</p></div>
    )
}
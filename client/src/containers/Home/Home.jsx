import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import "./home.css";
import axios from "axios";
import TotalFinances from "../../components/TotalFinances/TotalFinances";
import Button from "../../components/Button/Button";
import LastOperations from "../../components/Operations/LastOperations/LastOperations";

export default function Home () {

    const history = useHistory();

    return (
        <div className = "containerHomeDiv">

            <TotalFinances/>
            <Button info = "NUEVA TRANSACCIÓN" onClick = "/abm"/>
            <LastOperations/>
        </div>
    )
}
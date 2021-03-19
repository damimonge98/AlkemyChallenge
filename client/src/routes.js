import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import ABM from "./components/ABM/ABM";

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {Home} />
                <Route exact path = "/abm" component = {ABM}/>
            </Switch>
        </BrowserRouter>
    )

}
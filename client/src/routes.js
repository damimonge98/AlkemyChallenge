import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./containers/Home/Home";
import ABM from "./containers/ABM/ABM";

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
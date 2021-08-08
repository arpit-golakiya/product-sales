import React from "react";
import {Route, Switch} from "react-router-dom";
import {routes as AppRoutes} from "../routes/route";
import Home from "./pages/Home";
function Content(){
    //const currentRoute = JSON.parse(localStorage.getItem('currentRoute'));
    return (
        <>
            <div className="Polaris-Page" style={{maxWidth:"100%",paddingTop:"3.2rem",paddingBottom:"3.2rem"}}>
                <div className="Polaris-Page__Content">
                    <Switch>
                        {AppRoutes.map((route,i) => {
                        return  <Route exact path={route.path} key={i} component={route.page.component}>
                        </Route>
                    })}
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default Content;

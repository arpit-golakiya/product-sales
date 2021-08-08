import React from "react";
import { Link, useLocation } from "react-router-dom";
import {routes as AppRoutes} from "../routes/route";
import {TitleBar} from "@shopify/app-bridge-react";
function Menu() {
    const location = useLocation();
    let currenRoute = AppRoutes.find(route => {return route.path === location.pathname });
    //localStorage.setItem('currentRoute', JSON.stringify(currenRoute));
    return(
        <>
            <div className="Polaris-Card panther-custom-header">
                <div>
                    <TitleBar title={currenRoute?.page.title} />
                    <div className="Polaris-Tabs__Wrapper">
                        <ul role="tablist" className="Polaris-Tabs">
                            { AppRoutes.map((route,i) => {
                                return <li className="Polaris-Tabs__TabContainer" key={i}>
                                    <Link to={route.path}>
                                        <button role="tab" type="button"
                                            className={`Polaris-Tabs__Tab ${location.pathname === route.path ? 'Polaris-Tabs__Tab--selected' : ""}`}>
                                            <span className="Polaris-Tabs__Title Polaris-Tabs--newDesignLanguage">{route.page.title}</span>
                                        </button>
                                    </Link>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;

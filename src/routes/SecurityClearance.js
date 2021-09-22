import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SecurityClearanceList from "../components/SecurityClearanceList.js";
// import SecurityClearanceForm from "../components/SecurityClearanceForm";
import NotFound from "../components/NotFound";
import {findAll,  } from "../services/api";
import AgentList from "../components/AgentList";
import SecurityClearanceForm from "../components/SecurityClearanceForm.js";

export default function SecurityClearance() {
    const [securityClearances, setSecurityClearances] = useState([]);

    //this loads securityClearances once on start up
    useEffect(() => {
        findAll("securityclearance").then((data) => setSecurityClearances(data));
    }, []); 

    let { path } = useRouteMatch();



    return (
        <div>   
        <Switch>
            <Route path={[`${path}/add`, `${path}/update:id`]}>
                <SecurityClearanceForm securityClearances={securityClearances} setSecurityClearances={setSecurityClearances}/>
            </Route>
            <Route exact path={path} >
                <SecurityClearanceList securityClearances={securityClearances} setSecurityClearances={setSecurityClearances}/>
            </Route>
            <Route path={`${path}/update/:id`}>
                <SecurityClearanceForm setSecurityClearances={setSecurityClearances} securityClearances={securityClearances}/>
            </Route>
            <Route path={`${path}/delete`}>
                <SecurityClearanceForm setSecurityClearances={setSecurityClearances} securityClearances={securityClearances}/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
        </div>
    )
    
}
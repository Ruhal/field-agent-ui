import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AgentList from "../components/AgentList";
import AgentForm from "../components/AgentForm";
import NotFound from "../components/NotFound";
import {AgentfindAll,  } from "../services/api";
import AliasList from "../components/AliasList";

export default function Alias() {
    const [alias, setAlias] = useState([]);
    let { path } = useRouteMatch();

    return (
        <div>   
        <Switch>
            {/* <Route path={[`${path}/add`, `${path}/update:id`]}>
                <AgentForm agents={agents} setAgents={setAgents}/>
            </Route> */}
            <Route exact path={path} >
                <AliasList alias={alias} setAlias={setAlias}/>
            </Route>
            {/* <Route path={`${path}/update/:id`}>
                <AgentForm setAgents={setAgents} agents={agents}/>
            </Route>
            <Route path={`${path}/delete`}>
                <AgentForm setAgents={setAgents} agents={agents}/>
            </Route> */}
            <Route>
                <NotFound/>
            </Route>
        </Switch>
        </div>
    )
    
}
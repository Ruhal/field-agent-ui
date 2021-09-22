import { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AgentList from "../components/AgentList";
import AgentForm from "../components/AgentForm";
import NotFound from "../components/NotFound";
import {findAll,  } from "../services/api";

export default function Agents() {
    const [agents, setAgents] = useState([]);

    //this loads agents once on start up
    useEffect(() => {
        findAll("agent").then((data) => setAgents(data));
    }, []); 

    let { path } = useRouteMatch();



    return (
        <div>   
        <Switch>
            <Route path={[`${path}/add`, `${path}/update:id`]}>
                <AgentForm agents={agents} setAgents={setAgents}/>
            </Route>
            <Route exact path={path} >
                <AgentList agents={agents} setAgents={setAgents}/>
            </Route>
            <Route path={`${path}/update/:id`}>
                <AgentForm setAgents={setAgents} agents={agents}/>
            </Route>
            <Route path={`${path}/delete`}>
                <AgentForm setAgents={setAgents} agents={agents}/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
        </div>
    )
    
}
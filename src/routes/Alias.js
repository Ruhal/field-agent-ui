import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "../components/NotFound";
import AliasList from "../components/AliasList";
import AliasForm from "../components/AliasForm";

export default function Alias() {
    const [alias, setAlias] = useState([]);
    const [agentId, setAgentId] = useState();
    let { path } = useRouteMatch();

    return (
        <div>   
        <Switch>
            <Route path={[`${path}/add`, `${path}/update`]}>
                <AliasForm agentId={agentId} setAgentId={setAgentId} aliases={alias} setAlias={setAlias}/>
            </Route>
            <Route exact path={path} >
                <AliasList agentId={agentId} setAgentId={setAgentId} alias={alias} setAlias={setAlias}/>
            </Route>
            <Route path={`${path}/delete`}>
                <AliasForm agentId={agentId} setAgentId={setAgentId} aliases={alias} setAlias={setAlias}/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
        </div>
    )
    
}
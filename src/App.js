import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MainNav from './components/MainNav';
import Home from './routes/Home';
import AgentsNav from './components/AgentsNav';
import AliasNav from './components/AliasNav';
import Agents from './routes/Agents';
import NotFound from './components/NotFound';
import Alias from "./routes/Alias";
import SecurityClearance from "./routes/SecurityClearance";
import SecurityClearanceNav from "./components/SecurityClearanceNav";


export default function App() {
    return (
        <>
            <Router>
                <MainNav />
                <Switch>
                    <Route path="/alias">
                    <AliasNav />
                    <Alias />
                    </Route>
                    <Route path="/agents">
                    <AgentsNav/>
                    <Agents />
                    </Route>
                    <Route path="/securityclearance">
                    <SecurityClearanceNav />
                    <SecurityClearance />
                    </Route>
                    <Route  exact path="/">
                    <Home />
                    </Route>
                    <Route>
                    <NotFound/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}
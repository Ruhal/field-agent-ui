import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Table, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import MainNav from './components/MainNav';
import Home from './routes/Home';
import AgentsNav from './components/AgentsNav';
import AliasNav from './components/AliasNav';
import Agents from './routes/Agents';
import NotFound from './components/NotFound';
import Alias from "./routes/Alias";

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






function Alias1() {
    let match = useRouteMatch();

  return (
    <div className="container">

      <Switch>  
        <Route path={`${match.path}/add`}>
          <AliasAdd />
        </Route>
        <Route path={match.path}>
          <AliasById />
        </Route>
      </Switch>

    </div>
  )
  

}

function AliasById (prop) {

  const [aliasUpdate, setAliasUpdate] = useState({
    aliasId: "",
    name: "",
    persona: "",
    agentId: ""
});

  const [agentId, setAgentId] = useState();

  const [load, setLoad] = useState(-1);

  const [alias, setAlias] = useState([]);

  const expand = function (evt) {

    evt.preventDefault();
    
    if (load === 0){
      setLoad(1);

    } else {
      setLoad(0);

    }

}
  

  

  return(
    <div >  
        <div className="container">
        <br />
            <div className="jumbotron">
                <h1>Find Alias' by Agent ID</h1>

            </div>        


            <div className=" p-5 .flex-column">

                <Form >
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalText"  >
                        <Form.Label column sm={2} >
                          Agent ID
                        </Form.Label>
                        <Col sm={3}>
                        <Form.Control required name="firstName" type="number" placeholder="Agent ID" value={agentId} onChange={(e) => {setAgentId(e.target.value)}}/>
                        </Col>
                    </Form.Group>                    
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                         {load === -1 &&   
                        <Button type="submit" value="Submit" className="btn2" onClick={(evt)=> {expand(evt)}} >Search</Button>
                         }
                         {load === 0 &&
                         "Refresh the page to search again"
                         
                         }

                        </Col>
                    </Form.Group>
                </Form>
    
            </div>

            {load > -1 && agentId > 0  &&
            <SearchFn agentId={agentId} alias={alias} setAlias={setAlias} aliasUpdate={aliasUpdate} setAliasUpdate={setAliasUpdate}/>
            }

            


            </div>

    </div>


    
);
}

function SearchFn (prop) {



    const deleteById = (aliasId) => {
    fetch(`http://localhost:8080/api/alias/${aliasId}`, { method: "DELETE" })
        .then(response => {
            if (response.status === 204) {
                prop.setAlias(prop.alias.filter(s => s.aliasId !== aliasId));
            } else if (response.status === 404) {
                return Promise.reject("Alias not found");
            } else {
                return Promise.reject(`Delete failed with status: ${response.status}`);
            }
        })
        .catch(console.log);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/alias/agent/${prop.agentId}`)
            .then(response => {
                if (response.status === 404){
                    prop.setAlias([]);
                    return Promise.reject("404 Alias not found");
                }
                if (response.status !== 200) {
                    prop.setAlias([]);
                    console.log(prop.agentId);
                    return Promise.reject("Alias fetch failed")
                }
                return response.json();
            })
            .then(json => prop.setAlias(json))
            .catch(console.log);
    
    }, [prop]);

    return(

    <Switch>
    <Route path={`/alias/update`}>
        <AliasUpdate aliasUpdate={prop.aliasUpdate} setAliasUpdate={prop.setAliasUpdate} setAlias={prop.setAlias} agentId={prop.agentId} alias={prop.alias}  />
    </Route>
    <Route path={`/alias`}>
    <div>
    {prop.alias.length > 0 && <div><div>

    </div>

    

    <Table striped bordered hover size="sm">
                        <thead>
                                <tr>
                                    <th>Alias ID</th>
                                    <th>Name</th>
                                    <th>Persona</th>
                                    <th>Agent ID</th>
                                    <th>Actions</th>
                                </tr>                        
                        </thead>
                            <tbody>
                            {prop.alias.map(s => (
                                <tr key={s.aliasId}>
                                    <td><center>{s.aliasId}</center></td>
                                    <td><center>{s.name}</center></td>
                                    <td><center>{s.persona}</center></td>
                                    <td><center>{s.agentId}</center></td>
                                    <td>
                                        <Button onClick={() => deleteById(s.aliasId)}>Delete</Button>
                                        <Link to={`alias/update` } onClick={() => {prop.setAliasUpdate(s)}}>
                                            <Button>Update</Button>
                                        </Link>     
                                    </td>
                                </tr>)
                            )}
                        </tbody>
                        
                    </Table>
    </div>

    }
    </div>
    </Route>

    </Switch>
    );
}






function AliasAdd() {

  // const [message, setMessage] = useState("");

  const initialAgent={
      name: "",
      persona: "",
      agentId: ""
  }

  const [alias, setAlias] = useState(initialAgent);

  const handleChange = function (evt) {
      let nextPaper = { ...alias };

      nextPaper[evt.target.name] = evt.target.value;

      setAlias(nextPaper);

  };

  const [rd, setRd] = useState(0);   
  
  if (rd === 1) {
      return <Redirect to='/alias' />
  }

  const redirect = () => {
      setRd(1);       
  }

  


  const add = (evt) => {

      evt.preventDefault(evt);


      const init = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(alias)
      };

      fetch("http://localhost:8080/api/alias", init)
          .then(response => {
              if (response.status !== 201) {
                  return Promise.reject("response is not 200 OK");
              }
              redirect();
              return response.json();
          })
          .catch(error => {

              console.log(error);
          });
  };




  return(
      <div >  
          <div className="container">
          <br />
              <div className="jumbotron">
                  <h1>Add an Alias using a valid agent ID to the database</h1>

              </div>        


              <div className=" p-5 .flex-column">

                  <Form onSubmit={(evt) => { add(evt)}} >
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText"  >
                      
                        <Form.Label column sm={2} >
                          name
                          </Form.Label>
                          <Col sm={3}>
                          <Form.Control required name="name" type="text" placeholder="name" value={alias.name} onChange={(e) => {handleChange(e)}}/>
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                          <Form.Label column sm={2}>
                          Persona
                          </Form.Label>
                          <Col sm={3}>
                          <Form.Control onChange={(e) => {handleChange(e)}} type="text" name="persona" value={alias.persona} placeholder="Persona"/>
                          </Col>
                      </Form.Group>
              
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                          <Form.Label column sm={2}>
                              Agent ID
                          </Form.Label>
                          <Col sm={3}>
                          <Form.Control required onChange={(e) => {handleChange(e)}}  type="number" value={alias.agentId} name="agentId"  placeholder="agent ID"/>
                          </Col>
                      </Form.Group>



                      <Form.Group as={Row} className="mb-3">
                          <Col sm={{ span: 10, offset: 2 }}>
                              
                          <Button type="submit" value="Submit" className="btn2" >Add</Button>

                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                          <Col sm={{ span: 10, offset: 2 }}>
                          <Button onClick={() => redirect()}>Cancel</Button>
                          </Col>
                      </Form.Group>
                  </Form>
      
              </div>


              </div>

      </div>


      
  );
}



////////

function AliasUpdate(prop){

  const [message, setMessage] = useState("");

  const idx = prop.alias.indexOf(prop.aliasUpdate);

  const [rd, setRd] = useState(0);
  
  const [agent, setAgent] = useState(prop.aliasUpdate);


  const handleChange = function (evt) {
      let nextPaper = { ...agent };

      nextPaper[evt.target.name] = evt.target.value;

      setAgent(nextPaper);
      
  };



  const update = (evt) => {

      evt.preventDefault();

      const init = {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(agent)
      };



      
      fetch(`http://localhost:8080/api/alias/${agent.aliasId}`, init)
          .then(response => {
              if (response.status === 204) {
                  //setAgent(initialAgent);
                  //redirect();
                  updateAgentList();
                  redirect();
                  
              } else if (response.status === 404) {
                  return Promise.reject("Alias not found");
              } else {
                  console.log(response.body[0]);
                  return Promise.reject(`Update failed with status: ${response.status}`);
              }
          })
          .catch(error => {
              setMessage(error);
              console.log(error);
          });
              
              
              //setMessage("The database has rejected your data, please seee the database manual for valid data submission."));
  };

  if (rd === 1) {
      return <Redirect to='/alias' />
  }

  const updateAgentList = function () {
      let nextList = prop.alias ;

      nextList[idx] = agent;
      prop.setAlias(nextList);

  }

  const redirect = () => {
     // updateAgentList();
      setRd(1);       
  }

  return(
      <div >  
          <div className="container">
          <br />
              <div className="jumbotron">
                  <h1>Update information for Alias {agent.aliasId}</h1>

              </div>        


              <div className=" p-5 .flex-column">

                  <Form onSubmit={(evt) => { update(evt)}} >
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText"  >
                          <Form.Label column sm={2} >
                          Alias ID
                          </Form.Label>
                          <Col sm={3}>
                          <Form.Control readOnly name="aliasId" type="number" value={agent.aliasId} readyOnly onChange={(e) => {handleChange(e)}}/>
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                          <Form.Label column sm={2}>
                          name
                          </Form.Label>
                          <Col sm={3}>
                          <Form.Control onChange={(e) => {handleChange(e)}} type="text" name="name" value={agent.name} readyOnly />
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                          <Form.Label column sm={2}>
                          Last Name
                          </Form.Label>
                          <Col sm={3}>
                          <Form.Control required onChange={(e) => {handleChange(e)}} type="text" value={agent.persona} name="persona"  readyOnly/>
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                          <Form.Label column sm={2}>
                              Height in Inches
                          </Form.Label>
                          <Col sm={3}>
                          <Form.Control required onChange={(e) => {handleChange(e)}}  type="number" value={agent.agentId} name="agentId"  readyOnly/>
                          </Col>
                      </Form.Group>


                      <Form.Group as={Row} className="mb-3">
                          <Col sm={{ span: 10, offset: 2 }}>
                              
                          <Button type="submit" value="Submit" className="btn2" >Update</Button>

                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                          <Col sm={{ span: 10, offset: 2 }}>
                          <Button onClick={() => redirect()}>Cancel</Button>
                          </Col>
                      </Form.Group>
                  </Form>


                  {typeof message === 'string' && message !== "" && <Alert variant='danger'>
                          {message}
                  </Alert>}
                  
              </div>
              </div>
          
      </div>
      
  );
  
}
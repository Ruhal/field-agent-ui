import {
    Link,
    useRouteMatch,
} from "react-router-dom";

import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { AliasFindByAgentId } from "../services/api";


export default function AliasList({alias, setAlias, setAgentId}) {

    let match = useRouteMatch();

    function handleSubmit(e) {
        e.preventDefault();
        const newEntry = Object.fromEntries(new FormData(e.target));
        AliasFindByAgentId(newEntry.agentId).then(response => 
            {   
                setAlias(response);
                setAgentId(newEntry.agentId);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
        
    }

    return (            
            <>  <div className="container">
                    <br />
                    <div className="jumbotron">
                        <h1>Find Alias' by Agent ID</h1>
                    </div>      
                    <br />
                    <div >

                    <Form onSubmit={(e) => { handleSubmit(e)}}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText"  >
                            <Form.Label column sm={2} >
                            Agent ID
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control required name="agentId" type="number" placeholder="Agent ID" />
                            </Col>
                        </Form.Group>                    
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" value="Submit" className="btn2" >Search</Button>                           
                            </Col>
                        </Form.Group>
                    </Form>

                    </div>


                    
                    <div>                    
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
                            {alias.map(s => (
                                <tr key={s.aliasId}>
                                    <td><center>{s.aliasId}</center></td>
                                    <td><center>{s.name}</center></td>
                                    <td><center>{s.persona}</center></td>
                                    <td><center>{s.agentId}</center></td>
                                    <td>                                        
                                        <Button as={Link} to={{pathname:`${match.url}/delete`, state: {alias: s, isDelete: 1 }}} >Delete</Button>
                                        {" "}
                                        <Button as={Link} to={{pathname:`${match.url}/update/${s.aliasId}`, state: {alias: s }}} >Update</Button>
                                    </td>
                                </tr>)
                            )}
                        </tbody>
                        
                    </Table>
                    </div>
                
                    </div>
            </>
        
    );
}




import { useState } from 'react';
import {
    Link,
    useRouteMatch,
} from "react-router-dom";

import { Button, Table } from 'react-bootstrap';


export default function AgentList({agents, setAgents}) {
    const [btn3, setbtn3] = useState("Expand details");
    const [expantInt, setExpandInt] = useState(0);
    const expand = function () {
        if (expantInt === 0){
            setExpandInt(1);
            setbtn3("Collapse details");
        } else {
            setExpandInt(0);
            setbtn3("Expand details");
        }
    }

    let match = useRouteMatch();

    return (            
                <>  <div className="container">
                    <br />
                    <div className="container">
                        <div className="jumbotron">
                            <h1>List of all agents</h1>
                        </div>  
                        <br />
                    <Button onClick={expand}>{btn3}</Button>
                    </div>
                    <br />                    
                    <Table striped bordered hover size="sm">
                        <thead>
                            
                            {expantInt===0 &&
                                <tr>
                                    <th>ID</th>
                                    <th>Full name</th>
                                    <th>Actions</th>
                                </tr>
                            }
                                
                            {expantInt===1 &&
                                <tr>
                                    <th>ID</th>
                                    <th>First name</th>
                                    <th>Middle name</th>
                                    <th>Last name</th>
                                    <th>DOB</th>
                                    <th>Height in Inches</th>
                                    <th>Actions</th>
                                </tr>
                            }                            
                        </thead>

                        <tbody>
                            {agents.map(s => (
                                <tr key={s.agentId}>
                                    <td><center>{s.agentId}</center></td>
                                    {expantInt===0 &&
                                    <td><center>{s.firstName} {s.middleName} {s.lastName}</center></td>
                                    }
                                    {expantInt===1 && <>
                                    <td><center>{s.firstName}</center></td>
                                    <td><center>{s.middleName}</center></td>
                                    <td><center>{s.lastName}</center></td>
                                    <td><center>{s.dob}</center></td>
                                    <td><center>{s.heightInInches}</center></td>
                                    </>}
                                    <td>                                        
                                        <Button as={Link} to={{pathname:`${match.url}/delete`, state: {agent: s, isDelete: 1 }}} >Delete</Button>
                                        {" "}
                                        <Button as={Link} to={{pathname:`${match.url}/update/${s.agentId}`, state: {agent: s }}} >Update</Button>
                                    </td>
                                </tr>)
                            )}
                        </tbody>
                        

                    </Table>

                    </div>
                    
                </>
        
    );
}




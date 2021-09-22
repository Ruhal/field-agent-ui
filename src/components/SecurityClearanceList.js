import {
    Link,
    useRouteMatch,
} from "react-router-dom";
import { Button, Table } from 'react-bootstrap';

export default function SecurityClearanceList({securityClearances, setSecurityClearances}) {

    let match = useRouteMatch();

    return (            
            <>  
                <div className="container">
                    <br />
                    <div className="container">
                        <div className="jumbotron">
                            <h1>List of all Security Clearances</h1>
                        </div>  
                        <br />
                    </div>
                    <br />                    
                    <Table striped bordered hover size="sm">
                        <thead>                            
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>                                                           
                        </thead>
                        <tbody>
                            {securityClearances.map(s => (
                                <tr key={s.securityClearanceId}>
                                    <td><center>{s.securityClearanceId}</center></td>
                                    <td><center>{s.name}</center></td>
                                    <td>                                        
                                        <Button as={Link} to={{pathname:`${match.url}/delete`, state: {securityClearance: s, isDelete: 1 }}} >Delete</Button>
                                        {" "}
                                        <Button as={Link} to={{pathname:`${match.url}/update/${s.securityClearanceId}`, state: {securityClearance: s }}} >Update</Button>
                                    </td>
                                </tr>)
                            )}
                        </tbody>
                    </Table>
                </div>                    
            </>
    );
}




import {Link, useLocation, useHistory } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Add, DeleteById, Update,  } from "../services/api";


function AgentForm({setAgents, agents}){
    const location = useLocation();
    const agent = location.state ? location.state.agent : null;
    const isDelete = location.state && location.state.isDelete ? location.state.isDelete : null;
    let history = useHistory();   

    function handleSubmit(e) {
        e.preventDefault();
        if(isDelete === 1){
            DeleteById({table: "/agent/", Id: agent.agentId}).then(response => {
                if(response === true){
                    setAgents(agents.filter(s => s.agentId !== agent.agentId));
                    history.push('/agents');
                } else {
                    alert('Delete failed.');
                } })
                .catch(error => {
                    console.log(error);
                    alert(error);
                });
        } else {
            const newAgent = Object.fromEntries(new FormData(e.target));
            location.state
                        ? Update({new: {...newAgent, agentId: agent.agentId}, table: "/agent/", Id: agent.agentId}).then(response => {
                            console.log(response);
                            if(response === true){
                                let nextList = agents ;
                                nextList[agents.indexOf(agent)] = {...newAgent, agentId: agent.agentId};
                                setAgents(nextList);
                                history.push('/agents');
                            } else {
                                alert('Update failed.');
                            } }
                            )                
                            .catch(error => {
                                console.log(error);
                                alert(error);
                            })                         
                        : Add({new: newAgent, table: "/agent/"}).then(response => {
                            console.log(response);
                            if(response === true){
                                const nextId = Math.max(...agents.map(m => m.agentId),0)+1;
                                setAgents([...agents, {...newAgent, agentId: nextId}]);
                                history.push('/agents');
                            } else {
                                alert('Add failed.');
                            } }
                            )                
                            .catch(error => {
                                console.log(error);
                                alert(error);
                            });
        }
    }

    // minimum date of birth calculated, agent needs to be at least 12 years old
    var date2 = new Date();
    date2.setFullYear(date2.getFullYear() - 12);


    return(
        <>  

            <div className="container">
            <br />
                <div className="jumbotron">
                    <h1>{isDelete !== 1 && (agent ? "Update information for Agent "+agent.agentId : "Add an agent to the database")}{isDelete === 1  && "Are you sure you want to delete Agent "+agent.agentId+" from the database? "}</h1>

                </div>        


                <div className=" p-5 .flex-column">

                    <Form onSubmit={(e) => { handleSubmit(e)}} >
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2} >
                            First Name
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control name="firstName" type="text" defaultValue={agent?.firstName} required disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                            Middle Name
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control type="text" name="middleName" defaultValue={agent?.middleName} disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                            Last Name
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control type="text" defaultValue={agent?.lastName} name="lastName"  required disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                            Date of birth
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control className="date1" type="date" name="dob" defaultValue={agent?.dob} max={date2.toISOString().split('T')[0]} required disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                                Height in Inches
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control type="number" defaultValue={agent?.heightInInches} name="heightInInches"  required min={36} max={96} disabled={isDelete? true : false} />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                
                            <Button type="submit" value="Submit" className="btn2" >{agent ? (isDelete !== 1 && "Update") || (isDelete === 1 && "Delete") : "Add"}</Button>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button as={Link} to="/agents">Cancel</Button>
                            </Col>
                        </Form.Group>
                    </Form>
        
                </div>
                </div>



        </>
        
        
        
    );
    
}

export default AgentForm;
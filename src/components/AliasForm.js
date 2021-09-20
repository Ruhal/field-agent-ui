import {Link, useLocation, useHistory } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { AgentAdd, AgentdeleteById, AgentUpdate,  } from "../services/api";


function AliasForm({setAlias, alias}){
    const location = useLocation();
    const alias = location.state ? location.state.alias : null;
    const isDelete = location.state && location.state.isDelete ? location.state.isDelete : null;
    let history = useHistory();   

    function handleSubmit(e) {
        e.preventDefault();
        if(isDelete === 1){
            AgentdeleteById(alias.aliasId).then(response => {
                if(response === true){
                    setAlias(alias.filter(s => s.aliasId !== agent.aliasId));
                    history.push('/alias');
                } else {
                    alert('Delete failed.');
                } })
                .catch(error => {
                    console.log(error);
                    alert(error);
                });
        } else {
            const newAlias = Object.fromEntries(new FormData(e.target));
            location.state
                        ? AgentUpdate({...newAlias, aliasId: agent.aliasId}).then(response => {
                            console.log(response);
                            if(response === true){
                                let nextList = alias ;
                                nextList[alias.indexOf(agent)] = {...newAlias, aliasId: agent.aliasId};
                                setAlias(nextList);
                                history.push('/alias');
                            } else {
                                alert('Update failed.');
                            } }
                            )                
                            .catch(error => {
                                console.log(error);
                                alert(error);
                            })                         
                        : AgentAdd(newAgent).then(response => {
                            console.log(response);
                            if(response === true){
                                const nextId = Math.max(...alias.map(m => m.aliasId),0)+1;
                                setAlias([...alias, {...newAlias, aliasId: nextId}]);
                                history.push('/alias');
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

    return(
        <>  

            <div className="container">

            <br />
                <div className="jumbotron">
                    <h1>{isDelete !== 1 && (agent ? "Update information for Agent "+agent.aliasId : "Add an agent to the database")}{isDelete === 1  && "Are you sure you want to delete Agent "+agent.aliasId+" from the database? "}</h1>

                </div>        


                <div className=" p-5 .flex-column">

                    <Form onSubmit={(e) => { handleSubmit(e)}} >
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2} >
                            First Name
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control name="firstName" type="text" defaultValue={alias?.firstName} disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                            Middle Name
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control type="text" name="middleName" defaultValue={alias?.middleName} disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                            Last Name
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control type="text" defaultValue={alias?.lastName} name="lastName"  disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                            Date of birth
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control className="date1" type="date" name="dob" defaultValue={alias?.dob} disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                                Height in Inches
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control type="number" defaultValue={alias?.heightInInches} name="heightInInches"  disabled={isDelete? true : false} />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                
                            <Button type="submit" value="Submit" className="btn2" >{agent ? (isDelete !== 1 && "Update") || (isDelete === 1 && "Delete") : "Add"}</Button>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button as={Link} to="/alias">Cancel</Button>
                            </Col>
                        </Form.Group>
                    </Form>
        
                </div>
                </div>



        </>
        
        
        
    );
    
}

export default AgentForm;
import {Link, useLocation, useHistory } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Add, DeleteById, Update,  } from "../services/api";


function AliasForm({setAlias, aliases, agentId}){
    const location = useLocation();
    const alias = location.state ? location.state.alias : null;
    const isDelete = location.state && location.state.isDelete ? location.state.isDelete : null;
    let history = useHistory();   

    function handleSubmit(e) {
        e.preventDefault();
        if(isDelete === 1){
            DeleteById({table: "/alias/", Id: alias.aliasId}).then(response => {
                if(response === true){
                    setAlias(aliases.filter(s => s.aliasId !== alias.aliasId));
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
                        ? Update({new: {...newAlias, aliasId: alias.aliasId}, table: "/alias/", Id: alias.aliasId}).then(response => {
                            console.log(response);
                            if(response === true){
                                if(newAlias.agentId === agentId) {
                                    let nextList = aliases ;
                                    nextList[aliases.indexOf(alias)] = {...newAlias, aliasId: alias.aliasId};
                                    setAlias(nextList);
                                }
                                history.push('/alias');
                            } else {
                                alert('Update failed.');
                            } }
                            )                
                            .catch(error => {
                                console.log(error);
                                alert(error);
                            })                         
                        : Add({new: newAlias, table: "/alias/"}).then(response => {
                            console.log(response);
                            if(response === true){
                                if(newAlias.agentId === agentId) {
                                    const nextId = Math.max(...aliases.map(m => m.aliasId),0)+1;
                                    setAlias([...aliases, {...newAlias, aliasId: nextId}]);
                                }                                
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
                    <h1>{isDelete !== 1 && (alias ? "Update information for Alias "+alias.aliasId : "Add an alias to the database")}{isDelete === 1  && "Are you sure you want to delete Alias "+alias.aliasId+" from the database? "}</h1>

                </div>        


                <div className=" p-5 .flex-column">

                    <Form onSubmit={(e) => { handleSubmit(e)}} >
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2} >
                            Name
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control name="name" type="text" defaultValue={alias?.name} disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                            Persona
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control type="text" name="persona" defaultValue={alias?.persona} disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2}>
                                Agent ID
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control type="number" defaultValue={alias?.agentId} name="agentId"  disabled={isDelete? true : false} />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                
                            <Button type="submit" value="Submit" className="btn2" >{alias ? (isDelete !== 1 && "Update") || (isDelete === 1 && "Delete") : "Add"}</Button>

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

export default AliasForm;
import {Link, useLocation, useHistory } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Add, DeleteById, Update,  } from "../services/api";


function SecurityClearanceForm({setSecurityClearances, securityClearances}){
    const location = useLocation();
    const securityClearance = location.state ? location.state.securityClearance : null;
    const isDelete = location.state && location.state.isDelete ? location.state.isDelete : null;
    let history = useHistory();   

    function handleSubmit(e) {
        e.preventDefault();
        if(isDelete === 1){
            DeleteById({table: "/securityclearance/", Id: securityClearance.securityClearanceId}).then(response => {
                if(response === true){
                    setSecurityClearances(securityClearances.filter(s => s.securityClearanceId !== securityClearance.securityClearanceId));
                    history.push('/securityclearance');
                } else {
                    alert('Delete failed.');
                } })
                .catch(error => {
                    console.log(error);
                    alert(error);
                });
        } else {
            const newSecurityClearance = Object.fromEntries(new FormData(e.target));
            location.state
                        ? Update({new: {...newSecurityClearance, securityClearanceId: securityClearance.securityClearanceId}, table: "/securityclearance/", Id: securityClearance.securityClearanceId}).then(response => {
                            console.log(response);
                            if(response === true){
                                let nextList = securityClearances ;
                                nextList[securityClearances.indexOf(securityClearance)] = {...newSecurityClearance, securityClearanceId: securityClearance.securityClearanceId};
                                setSecurityClearances(nextList);
                                history.push('/securityclearance');
                            } else {
                                alert('Update failed.');
                            } }
                            )                
                            .catch(error => {
                                console.log(error);
                                alert(error);
                            })                         
                        : Add({new: newSecurityClearance, table: "/securityclearance/"}).then(response => {
                            console.log(response);
                            if(response === true){
                                const nextId = Math.max(...securityClearances.map(m => m.securityClearanceId),0)+1;
                                setSecurityClearances([...securityClearances, {...newSecurityClearance, securityClearanceId: nextId}]);
                                history.push('/securityclearance');
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
                    <h1>{isDelete !== 1 && (securityClearance ? "Update information for Security Clearance "+securityClearance.securityClearanceId : "Add a Security Clearance to the database")}{isDelete === 1  && "Are you sure you want to delete Security Clearance "+securityClearance.securityClearanceId+" from the database? "}</h1>

                </div>        


                <div className=" p-5 .flex-column">

                    <Form onSubmit={(e) => { handleSubmit(e)}} >
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
                            <Form.Label column sm={2} >
                            Name
                            </Form.Label>
                            <Col sm={3}>
                            <Form.Control name="name" type="text" defaultValue={securityClearance?.name} required disabled={isDelete? true : false}/>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                
                            <Button type="submit" value="Submit" className="btn2" >{securityClearance ? (isDelete !== 1 && "Update") || (isDelete === 1 && "Delete") : "Add"}</Button>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button as={Link} to="/securityclearance">Cancel</Button>
                            </Col>
                        </Form.Group>
                    </Form>
        
                </div>
                </div>



        </>
        
        
        
    );
    
}

export default SecurityClearanceForm;
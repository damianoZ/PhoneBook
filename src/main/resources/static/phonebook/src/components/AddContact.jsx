
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap";
import { FormControl,Button,Col,InputGroup,Row,Form } from "react-bootstrap";

class AddContact extends React.Component{

        state = {firstName:"", lastName:"", phoneNumber: "", favorite: false, group: 1, groups: this.props.groups}
        
    handleCreateContact = (e) => {
        e.preventDefault();
            this.props.createContact(this.state.firstName, this.state.lastName, 
            this.state.phoneNumber, this.state.favorite,
            this.state.group);
            this.setState({firstName:"", lastName:"", phoneNumber: ""});
    }
  
    searchGroups = (e) => {
        e.preventDefault();
        this.props.searchGroups(); 
        this.setState({group: e.target.value})
    }
   
    render(){
        return(
            <> 
           <Form onSubmit={this.handleCreateContact}>
                <Row className="align-items-center">
                    <Col xs="auto">
                    <Form.Control
                        className="mb-2"    
                        id="inlineFormInput"
                        placeholder="Name"
                        value={this.state.firstName} 
                        onChange={(e) => this.setState({firstName: e.target.value})}/>
                    </Col>
                    <Col xs="auto">
                        <Form.Select onChange={this.searchGroups}>
                        {this.props.groups.map(item => {
                                return(                                    
                                        <option key={item.id} value={item.id}>
                                            {item.groupName} 
                                        </option>                  
                                 )
                             })}
                        </Form.Select>
                    </Col>
                    <Col xs="auto">
                    <InputGroup className="mb-2">
                        <FormControl 
                        id="inlineFormInputGroup" 
                        placeholder="Surname"
                        value={this.state.lastName} 
                             onChange={(e) => this.setState({lastName: e.target.value})}/>
                    </InputGroup>
                    </Col>
                    <Col xs="auto">
                    <Form.Check
                        type="checkbox"
                        id="autoSizingCheck"
                        className="mb-2"
                        label="Favorite"
                        checked={this.state.favorite} 
                             onChange={(e) => this.setState({favorite: e.target.checked})}/>
                    </Col>

                    <Col xs="auto">
                    <InputGroup className="mb-2">
                        <FormControl 
                        className="required"
                        id="inlineFormInputGroup" 
                        placeholder="Phone number"
                        value={this.state.phoneNumber} 
                            onChange={(e) => this.setState({phoneNumber: e.target.value})}/>
                    </InputGroup>
                    </Col>                
                    <Col xs="auto">
                    <Button type="submit" variant="outline-warning">
                        +
                    </Button>
                     </Col>
                </Row>
            </Form>
            {this.props.isValid? null: <div className="already">non hai inserito uno o piu campi</div>}
            {this.props.exist?<div className="already">il contatto esiste gia</div>: null}
            </>
        )
    }
}

export default AddContact;
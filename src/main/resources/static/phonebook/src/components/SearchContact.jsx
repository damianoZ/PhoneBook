import React from "react";
import { Form, FormControl,Button,InputGroup } from "react-bootstrap";
import {ImSearch} from 'react-icons/im';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

class SearchContact extends React.Component {
    state = {lastName: "", favorite: false}; 

    findByName = (e) => {
        e.preventDefault();
        this.state.favorite? this.props.searchFavorite(this.state.lastName, this.state.favorite):this.props.onSubmit(this.state.lastName);
    }

    setFavorite = () => {
        this.state.favorite? this.setState({favorite: false}) : this.setState({favorite: true});
    }

    render(){
        return(
            <>
            <div className="container">       
                <div className="title">
                    <h1>PhoneBook</h1>
                </div>        
             <Form >                     
         
                <InputGroup className="mb" size="lg"  type="text" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})}>
                <Button variant="outline-success" id="button-addon2" onClick={this.findByName}>
                    <ImSearch/>
                    </Button>  
                    <FormControl
                    placeholder="Find contacts by Surname"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon4"
                    />
                    <Button variant="outline-warning" onClick={this.setFavorite}>
                         {this.state.favorite?<AiFillStar/>:<AiOutlineStar/>}
                    </Button>
                </InputGroup>
            </Form>
            </div>
            </>
        )
    }
}

export default SearchContact;
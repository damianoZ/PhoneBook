import axios from "axios";
import React from "react";
import AddContact from "./AddContact";
import ContactsList from "./ContactsList";
import SearchContact from "./SearchContact";
import "../components/App.css";
import { IoIosListBox } from 'react-icons/io';
import {FaUserPlus} from 'react-icons/fa';

class App extends React.Component {
  state = {contacts:[], groups:[], isValid: true, exist: false};

  componentDidMount(){
    this.searchContacts("");
     this.searchGroups("");
  }

  searchGroups = () => {
    fetch("http://localhost:8080/groups").then(response => response.json())
     .then(data =>this.setState({
       groups: data
     }))
   }

searchContacts = (lastName) => {
  fetch("http://localhost:8080/contacts?like="+lastName).then(response => response.json()).then(data =>this.setState({
    contacts: data
  }))
}

searchFavorite = (lastName,favorite) => {
  fetch("http://localhost:8080/contacts/favorite/?like="+lastName+"&favorite="+favorite).then(response => response.json()).then(data =>this.setState({
    contacts: data
  }))
}

newContact = (firstName, lastName, phoneNumber, favorite, group) => {
  axios.post("http://localhost:8080/contacts", {  
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        favorite: favorite,
        group: {
          id: group
        }
      }).then(response => {
        this.setState({isValid: true});
        this.searchContacts("");
      });
}

createContact = (firstName, lastName, phoneNumber, favorite, group) => {
  this.setState({isValid: true});
  this.setState({exist: false})
  let count = 0;
  if (firstName === "" || lastName === "" || phoneNumber === "" ){
    this.setState({isValid: false});
  } else {
    for(let c of this.state.contacts) {
      if(c.phoneNumber === phoneNumber || (c.firstName === firstName && c.lastName === lastName)) {
        count++;
        this.setState({exist: true});
      }
    }
    if(count === 0) {
      this.newContact(firstName, lastName, phoneNumber, favorite, group);
      this.setState({exist: false})
    }
  }
  }


deleteContact = (contactId) => {
  axios.delete("http://localhost:8080/contacts/"+contactId).then(response => {
    this.setState({contacts: this.state.contacts.filter(contact=> contact.id!==contactId)})
  });
}

updateContact = (contactId, contact) => {
  axios.put("http://localhost:8080/contacts/"+contactId, contact)
  .then(response => {
    this.searchContacts("")
  });
}

isFavorite = (contactId, contact) => {
  axios.put("http://localhost:8080/contacts/"+contactId+"/set-favorite", contact)
  .then(response => {
    const newContacts =[];
    this.state.contacts.forEach(c=>{
      if(c.id!== contactId){
        newContacts.push(c);
      }else {
        newContacts.push(response.data);
      }
    })
    this.setState({contacts: newContacts});
    this.searchContacts("");
  });
}


  render(){
    return(
    <>
    <div className="container">
        <div id="title">
          <SearchContact onSubmit={this.searchContacts} searchFavorite={this.searchFavorite}/>
        </div> 
        <div className="row">
          <div className="col-sm-6">
            <div id="list">
              <div className="list-title">
              <div className="list-icon">
              <IoIosListBox/>
              </div>
                <div className="list-h2">
                  <h2> Contact List</h2> 
                </div>
              </div>
               <ContactsList
                            groups={this.state.groups}
                            contacts={this.state.contacts}
                            isFavorite ={this.isFavorite}
                            deleteContact={this.deleteContact}
                            updateContact={this.updateContact}/>
                </div>
        </div>
          <div className="col-sm">
            <div id="add">
            <div className="add-form">
              <div className="list-icon">
              <FaUserPlus/>
              </div>
                <div className="list-h2">
                  <h2> Add contact</h2> 
                </div>
                </div>
              <AddContact exist ={this.state.exist} isValid ={this.state.isValid} groups={this.state.groups} searchGroups={this.searchGroups} createContact={this.createContact}/>
            </div>
        </div>
      </div>
    </div>
    </>
    )
  }
}
export default App;

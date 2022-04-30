import Accordion from 'react-bootstrap/Accordion';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { GiSmartphone  } from 'react-icons/gi';
import { MdOutlinePeopleAlt  } from 'react-icons/md';
import { HiTrash  } from 'react-icons/hi';
import { AiTwotoneEdit  } from 'react-icons/ai';
import { useState } from 'react';
import { BsCheckAll } from 'react-icons/bs';
import { useAccordionButton, Card, Col,Form } from 'react-bootstrap';

function Contact(props) {
    const [expanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState(props.contact.firstName);
    const [lastName, setLastName] = useState(props.contact.lastName);
    const [phoneNumber, setPhoneNumber] = useState(props.contact.phoneNumber);
    const [groupId, setGroup] = useState(props.contact.group.id);
    const [isFavorite, setFavorite] = useState(props.contact.favorite? false : true);

    function CustomToggle({ children, eventKey }) {
        const infoOnClick = useAccordionButton(eventKey);
      
        return (
          <div className={editing?'info-disabled':'null'}
            type="button"
            style={{borderRadius: '40%' }} 
            onClick={infoOnClick}
          >
            {children}
          </div>
        );
      }

    const changeExpansion = () => {
        expanded?setExpanded(false) : setExpanded(true);
    }
 
    const handleDeleteContact = () => {
        props.deleteContact(props.contact.id);
    }
    const handleUpdateContact = () => {
        props.updateContact(props.contact.id, {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            group: {
                id: groupId
            }
        });
        setEditing(false);
    }

    const handleIsFavorite = () => {
        isFavorite? setFavorite(false) : setFavorite(true);
        props.isFavorite(props.contact.id, {
            favorite: isFavorite
        }); 
    }

    const button = editing? 
        <div className="modify" onClick={() => handleUpdateContact()}><BsCheckAll/></div> :
        <div className="modify" onClick={() => setEditing(true)}><AiTwotoneEdit/></div>;

    const firstNameUi = editing?
    <Col xs="auto">
        <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Name"
            defaultValue={firstName} 
            onChange={(e) => setFirstName(e.target.value)}/>
    </Col> :
        firstName;

    const lastNameUi = editing?
    <Col xs="auto">
        <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Surname"
            defaultValue={lastName} 
            onChange={(e) => setLastName(e.target.value)}/>
    </Col> :
    lastName; 

    const phoneNumberUi = editing?

     <Col xs="auto">
        <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Phone number"
            defaultValue={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)}/>
    </Col>  :
    phoneNumber; 

    const groupUi = editing?
    <Col xs="auto">
        <Form.Select onChange={(e)=> setGroup(e.target.value)} >
        {props.groups.map(item=> {
                return(                                    
                        <option key={item.id} value={item.id}>
                            {item.groupName} 
                        </option>                     
                )
            })}
        </Form.Select>
    </Col>
     : 
   //props.groups.filter(g=> g.id == groupId)[0].groupName;
   (props.contact.group.groupName? props.contact.group.groupName : props.groups.filter(a=> a.id === groupId)[0].groupName);
 
    return(
        <div className="single-contact">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <div className='accordion-head'>
                            <div className={editing?'info-disabled':'info'} onClick={changeExpansion}>
                                   <CustomToggle eventKey="1">{expanded? "-" : "+"}</CustomToggle>
                            </div>
                            <div className='d-flex'>
                                <div className="single-contact-head">
                                    <span>{firstNameUi}</span> <span>{lastNameUi}</span> 
                                </div>
                                <div onClick={handleIsFavorite}>
                                    {props.contact.favorite? <div className="stars"><AiFillStar/></div>: <div className="stars"><AiOutlineStar/></div>}
                                </div> 
                            </div>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                    <div className="details">
                            <div className="row">
                                <div className="phone-icon">
                                    <GiSmartphone/>
                                </div>
                                <div className="phone-number">
                                    {phoneNumberUi}
                                </div>
                            </div>
                            <div className='row'>
                                <div className="group-icon">
                                    <MdOutlinePeopleAlt/>
                                </div> 
                                    <div className='group-select'>
                                     {groupUi}  
                                    </div>
                            </div>     
                            <div className="row">
                                <div className="buttons">
                                    <div className="modify">
                                        {button}
                                    </div>
                                    <div className="delete"onClick={handleDeleteContact}>
                                        <HiTrash/>
                                    </div>
                                </div>
                            </div>                           
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Contact;

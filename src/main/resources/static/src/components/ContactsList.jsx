
import Contact from './Contact';

function ContactsList(props) {
    const deleteFunction = (contactId) => {
        props.deleteContact(contactId);
    }

    const updateFunction = (contactId, contact) => {
        props.updateContact(contactId, contact);
    }

    const isFavorite = (contactId, contact) => {
        props.isFavorite(contactId, contact);
    }
    
    const contactList = props.contacts.map(contact =>{
        return(
        <Contact favorite={contact.favorite}
                groups={props.groups} 
                key={contact.id}
                contact={contact} 
                isFavorite={isFavorite}
                deleteContact={deleteFunction}
                updateContact={updateFunction}/>
        )
    })
    return(
        <>
        {contactList}
        </>
    )
}
export default ContactsList;


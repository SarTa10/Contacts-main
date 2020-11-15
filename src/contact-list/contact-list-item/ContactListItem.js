import React from 'react'
import './ContactListItem.css'

function ContactListItem({ contact: { id, name }, index, removeContact,editContact }) {
  return (
    <div className='card mt-3'>
      <div className='card-body'>
        {name}
        <button
          className='btn btn-danger float-right'
          onClick={() => removeContact(id)}
        >
          X
        </button>
        <button
          className='btn float-right my-class'
          onClick={() => editContact(id)}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default ContactListItem

import React, { Component, isValidElement } from 'react'
import * as db from './data'
import './contact.css'
import propTypes from 'prop-types'

const required= (val) => val && val.length;
const isNumber=(val)=> !isNaN(Number(val));
const Validemail=(val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class EditContact extends Component {
    static propTypes = {
        hanldeChange: propTypes.func.isRequired,
        handleEditContact: propTypes.func.isRequired
      }

  state = {
    id: Date.now(),
    name: '',
    phone: '',
    email: '',
  }

  hanldeChange = (event) => {
    const { name, value } = event.target
    this.setState(
      {
        [name]: value,
      },
      () => {}
    )
  }

  handleValidation = () =>{
    const name = required(this.state.name)
    const number = required(this.state.phone) && isNumber(this.state.phone)
    const email =required(this.state.email)&& Validemail(this.state.email)
    //name validation
    if(!name){
      alert('invalid name!')
    }
    //number validation
    if(!number){
      alert('invalid number!')
    }

    //email validation
    if(!email){
      alert('invalid email!') 
    }

  return  name && number && email
}

componentDidMount(){
    const data = db.getContacts()
    const currentContact = data.filter((x) => x.id === this.props.chosenId)
    this.setState(
        {
            id: this.props.chosenId,
            name: currentContact[0].name,
            phone: currentContact[0].phone,
            email: currentContact[0].email,
        }
    )
  }

  save = () => {
    if(this.handleValidation()){
    db.editContact(this.state)
    this.props.handleEditContact(this.state)
    this.props.close()
    }
  }

  render() {
    return (
      <div className='container filter-form'>
        <h4>კონტაქტის შეცვლა</h4>
        <hr />
        <br />
        <form>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>დასახელება</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              value={this.state.name}
              name='name'
              onChange={this.hanldeChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>ტელეფონი</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputPassword1'
              value={this.state.phone}
              name='phone'
              onChange={this.hanldeChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>ელ.ფოსტა</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputPassword1'
              value={this.state.email}
              name='email'
              onChange={this.hanldeChange}
            />
          </div>
          <button
            type='button'
            className='btn btn-primary mr-1'
            onClick={this.save}
          >
            შეცვლა
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => this.props.close()}
          >
            დახურვა
          </button>
        </form>
      </div>
    )
  }
}

export default EditContact

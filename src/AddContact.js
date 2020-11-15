import React, { Component, isValidElement } from 'react'
import * as db from './data'
import './contact.css'
import propTypes from 'prop-types'

const required= (val) => val && val.length;
const isNumber=(val)=> !isNaN(Number(val));
const Validemail=(val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class AddContact extends Component {

  static propTypes = {
    handleAddContact : propTypes.func.isRequired,
    hanldeChange : propTypes.func.isRequired
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



  save = () => {
    if(this.handleValidation()){
    db.addContact(this.state)
    this.props.handleAddContact(this.state)
    this.props.close()
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className='container filter-form'>
        <h4>კონტაქტის დამატება</h4>
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
            დამატება
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

export default AddContact

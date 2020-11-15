import React from 'react'
import Header from './Header'
import ContactList from './contact-list/ContactList'
import AddContact from './AddContact'
import Search from './search/Search'
import EditContent from './editContact'
import * as db from './data'
import './App.css'

class App extends React.Component {
  state = {
    contacts: null,
    isEnable: true,
    searchValue: '',
    addForm: false,
    editForm:false,
    chosenId:null
  }

  componentDidMount() {
    const data = db.getContacts()
    this.setState({ contacts: data })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevState, this.state)
    if (prevState.searchValue !== this.state.searchValue) {
      const data = db
        .getContacts()
        .filter((contact) =>
          contact.name
            .toUpperCase()
            .includes(this.state.searchValue.toUpperCase())||
          contact.phone
            .includes(this.state.searchValue)||
          contact.email.toUpperCase().includes(this.state.searchValue.toUpperCase())
        )
      this.setState({ contacts: data })
    }
  }

  handleClick = (id) => {
    const contactData = this.state.contacts.filter((x) => x.id !== id)
    this.setState({ contacts: contactData })
  }

  handleSearch = (event) => {
    const contacts = contacts.filter((x) =>
      x.name.toUpperCase().includes(event.target.value.toUpperCase()) || 
      x.phone.includes(event.target.value)||
      x.email.toUpperCase().includes(event.target.value.toUpperCase())
    )
    this.setState({
      searchValue: event.target.value,
      contacts,
    })
  }

  handleClose = () => {
    this.setState({ addForm: false })
  }

  editClose = () => {
    this.setState ({editForm:false})
  }

  handleRemoveContact = (id) => {
    this.setState({contacts: this.state.contacts.filter(item => item.id != id)})
    db.removeContact(id)
  }

  hendleShowAddForm = () => {
    this.setState({ addForm: true })
  }

  handleAddContact = (contact) => {
    this.setState({ contacts: [...this.state.contacts, contact] })
  }

  onSearch = (e) => {
    console.log('searchValue', e)
    this.setState({ searchValue: e.target.value })
  }

  handleEditContact = (contact) => {
    const updatedContact = this.state.contacts.filter((x) => x.id !== contact.id)
    this.setState({contacts: [...updatedContact, contact]})
  }

  editContactShow = (id) => {
    this.setState({editForm:true, chosenId:id})
  }

  render() {
    return (
      <>
        <Header />
        <Search
          searchValue={this.state.searchValue}
          showAddForm={this.hendleShowAddForm}
          handleSearch={this.onSearch}
        />
        {this.state.addForm ? (
          <AddContact
            close={this.handleClose}
            handleAddContact={this.handleAddContact}
          />
        ) : this.state.editForm ? 
        <EditContent
          close={this.editClose}
          handleEditContact={this.handleEditContact}
          chosenId={this.state.chosenId}
        />:(
          <ContactList
            contacts={this.state.contacts}
            handleRemoveContact={this.handleRemoveContact}
            editContact={this.editContactShow}
          />
        )}
      </>
    )
  }
}
export default App

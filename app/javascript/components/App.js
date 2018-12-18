import React, { Fragment } from 'react'
import Header from './Header'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css'

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      currentUserId: null,
      isLoading: true
    }
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount(){
    let that = this
    axios.get('/users/check_for_user', {
    })
    .then(response => {
      if(response.data.email){
        that.setState({
          currentUser: response.data.email,
          currentUserId: response.data.id,
          isLoading: false
        })
      } else {
        that.setState({
          currentUser: null,
          currentUserId: null
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  updateCurrentUser(email) {
    this.setState({
      currentUser: email
    })
  }

  render() {
    return (
      <Fragment>
        <Header currentUserId={this.state.currentUserId} isLoading={this.state.isLoading} />
        <ToastContainer />
      </Fragment>
    )
  }
}

export default App;
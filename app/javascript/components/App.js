import React, { Fragment } from 'react'
import Header from './Header'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
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
          currentUser: response.data.email
        })
      } else {
        that.setState({
          currentUser: null
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
        <Header />
      </Fragment>
    )
  }
}

export default App;
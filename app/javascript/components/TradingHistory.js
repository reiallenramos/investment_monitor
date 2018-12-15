import React, { Fragment } from 'react'
import axios from 'axios'

var base_stocks_url = 'http://192.168.0.14:3000/api/v1';

class TradingHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: [],
      currentUserId: null,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      currentUserId: nextProps.currentUserId,
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isLoading == false && this.state.currentUserId == null) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    this.fetchTradingHistory();
  }

  fetchTradingHistory() {
    console.log(`TradingHistory: fetching Trading History data for user_id: ${this.state.currentUserId}`);
    axios.get(`${base_stocks_url}/stocks/stock_history_by_user.json?user_id=${this.state.currentUserId}`)
      .then( res => {
        const stocks = res.data;
        this.setState({ stocks });
      })
  }

  componentDidMount() {
    if (this.state.currentUserId == null) {
      console.log('TradingHistory: waiting for App component to finish fetching user data');
    } else {
      this.fetchTradingHistory();
    }
  }

  render() {
    return (
      <Fragment>
        Trading History

      </Fragment>
    )
  }
}

export default TradingHistory;
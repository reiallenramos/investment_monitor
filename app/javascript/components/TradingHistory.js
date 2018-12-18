import React, { Fragment } from 'react'
import axios from 'axios'
import TradingHistoryPanel from './TradingHistoryPanel'
import * as constants from './constants'

class TradingHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: null,
      currentUserId: null,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      currentUserId: nextProps.currentUserId,
    }
  }

  fetchTradingHistory() {
    console.log(`TradingHistory: fetching Trading History data for user_id: ${this.state.currentUserId}`);
    axios.get(`${constants.REQUEST_URL}/stocks/stock_history_by_user.json?user_id=${this.state.currentUserId}`)
      .then( res => {
        const stocks = res.data;
        this.setState({ stocks });
      })
  }

  componentDidMount() {
    this.fetchTradingHistory();
  }

  render() {
    const { stocks } = this.state;
    let panels;

    if (this.state.stocks == null) {
      panels = <div>loading...</div>
    } else {
      panels = (
        stocks.map(stock => {
          return <TradingHistoryPanel key={stock.id} stock={stock}/>
        })
      )
    }

    return (
      <Fragment>
        {panels}
      </Fragment>
    )
  }
}

export default TradingHistory;
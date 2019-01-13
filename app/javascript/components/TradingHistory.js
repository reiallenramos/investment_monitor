import React, { Fragment } from 'react'
import myAxios from './requests'
import TradingHistoryPanel from './TradingHistoryPanel'

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
    myAxios.get(`/stocks/stock_history_by_user.json?user_id=${this.state.currentUserId}`)
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
          return <TradingHistoryPanel key={stock.id} stock={stock} currentUserId={this.state.currentUserId} />
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
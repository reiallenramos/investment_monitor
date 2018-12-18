import React, { Fragment } from 'react'
import axios from 'axios'
import * as constants from './constants'
import ReactTable from "react-table";

class TradingHistoryTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buy_entries: null,
      stockId: this.props.stockId,
      currentUserId: this.props.currentUserId
    }
  }

  componentDidMount() {
    axios.get(`${constants.REQUEST_URL}/buy_entries/by_user_and_stock.json?user_id=${this.state.currentUserId}&stock_id=${this.state.stockId}`)
      .then( res => {
        var buy_entries = res.data;

        buy_entries.forEach((entry) => {
          entry.type = 'BUY'
        })

        this.setState({ buy_entries });
      })
  }

  render() {
    const { buy_entries } = this.state;
    let table;

    const columns = [{
      Header: 'Date',
      accessor: 'trade_date'
    },{
      Header: 'Transaction',
      accessor: 'type',
      Cell: row => (
        <div style={{
          color: 
          row.value == 'BUY'
          ? 'green'
          : 'sell'
          }}>
          {row.value}
        </div>
      )
    },{
      Header: 'Quantity',
      accessor: 'quantity',
    },{
      Header: 'Stock Price',
      accessor: 'stock_price'
    },{
      Header: 'Gross Amount',
      accessor: 'gross_amount'
    },{
      Header: 'Net Amount',
      accessor: 'net_amount'
    }]

    if (this.state.buy_entries == null) {
      table = (
        <div>Loading...</div>
      )
    } else {
      table = <ReactTable data={buy_entries} columns={columns} defaultPageSize={5}/>
    }

    return (
      <Fragment>
        {table}
      </Fragment>
    )
  }
}

export default TradingHistoryTable;
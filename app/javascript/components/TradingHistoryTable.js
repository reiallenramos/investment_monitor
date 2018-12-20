import React, { Fragment } from 'react'
import axios from 'axios'
import * as constants from './constants'
import ReactTable from "react-table";

const GREEN = '3px solid rgba(82,210,154,1)';
const ORANGE = '3px solid rgba(235,118,85,1)';

class TradingHistoryTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buy_entries: null,
      sell_entries: null,
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
      }
    )

    axios.get(`${constants.REQUEST_URL}/sell_entries/by_user_and_stock.json?user_id=${this.state.currentUserId}&stock_id=${this.state.stockId}`)
      .then( res => {
        var sell_entries = res.data;

        sell_entries.forEach((entry) => {
          entry.type = 'SELL'
        })

        this.setState({ sell_entries });
      }
    )
  }

  getProps = (state, rowInfo) => {
    if (rowInfo && rowInfo.row) {
      return {
        style: {
          borderLeft:
            rowInfo.row.type === "BUY" ? GREEN : ORANGE
        }
      };
    } else {
      return {};
    }
  }

  render() {
    var buy_and_sell_entries = [];
    if (this.state.buy_entries != null && this.state.sell_entries != null) {
      buy_and_sell_entries = (this.state.buy_entries).concat(this.state.sell_entries);
    }

    let table;

    const columns = [{
      getProps: this.getProps,
      Header: 'Date',
      accessor: 'trade_date'
    },{
      Header: 'Transaction',
      accessor: 'type'
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

    if (this.state.buy_entries == null && this.state.sell_entries == null) {
      table = (
        <div>Loading...</div>
      )
    } else {
      table = <ReactTable data={buy_and_sell_entries} columns={columns} defaultPageSize={5} className="-striped -highlight" />
    }

    return (
      <Fragment>
        {table}
      </Fragment>
    )
  }
}

export default TradingHistoryTable;
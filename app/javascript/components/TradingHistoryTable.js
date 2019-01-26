import React, { Fragment } from 'react'
import ReactTable from "react-table";
import moment from 'moment'

const GREEN = '3px solid rgba(82,210,154,1)';
const ORANGE = '3px solid rgba(235,118,85,1)';

class TradingHistoryTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buyEntries: this.props.buyEntries,
      sell_entries: null,
      stockId: this.props.stockId,
      currentUserId: this.props.currentUserId
    }
  }

  componentDidMount() {
    // myAxios.get(`/sell_entries/by_user_and_stock.json?user_id=${this.state.currentUserId}&stock_id=${this.state.stockId}`)
    //   .then( res => {
    //     var sell_entries = res.data;

    //     sell_entries.forEach((entry) => {
    //       entry.type = 'SELL'
    //     })

    //     this.setState({ sell_entries });
    //   }
    // )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.buyEntries !== prevState.buyEntries){
      return { buyEntries: nextProps.buyEntries};
   }
    return null;
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
    if (this.state.buyEntries != null) {
      buy_and_sell_entries = (this.state.buyEntries);
    }

    let table;

    const columns = [{
      getProps: this.getProps,
      Header: 'Date',
      accessor: 'tradeDate',
      Cell: row => (
        <div>{moment(row.value).format('MMMM D, YYYY')}</div>
      )
    },{
      Header: 'Transaction',
      accessor: 'type'
    },{
      Header: 'Quantity',
      accessor: 'quantity',
    },{
      Header: 'Stock Price',
      accessor: 'stockPrice'
    },{
      Header: 'Gross Amount',
      accessor: 'grossAmount'
    },{
      Header: 'Net Amount',
      accessor: 'netAmount'
    }]

    if (this.state.buyEntries == null) {
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
import React, { Fragment } from 'react'
import axios from 'axios'
import { Table, PageHeader }from 'react-bootstrap'

var stocks_url = 'http://192.168.0.14:3000/api/v1/stocks.json';

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

class Stocks extends React.Component {
  constructor() {
    super();

    this.state = {
      stocks: []
    }
  }

  componentDidMount() {
    axios.get(stocks_url)
      .then( res => {
        const stocks = res.data;
        this.setState({ stocks });
      })
  }

  render() {
    const { stocks } = this.state;

    return (
      <Fragment>
        <PageHeader>
          Stock List
        </PageHeader>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Stock Name</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock =>
              <tr key={stock.id}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}

export default Stocks;
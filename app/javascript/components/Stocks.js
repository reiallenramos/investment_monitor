import React, { Fragment } from 'react'
import axios from 'axios'
import { Table, PageHeader, Button }from 'react-bootstrap'

var base_stocks_url = 'http://192.168.0.14:3000/api/v1';

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
    axios.get(`${base_stocks_url}/stocks.json`)
      .then( res => {
        const stocks = res.data;
        this.setState({ stocks });
      })
  }

  handleDeleteStock(id) {
    axios.delete(`${base_stocks_url}/stocks/${id}.json`)
      .then(res => {
        console.log('successfully deleted!');
        this.removeStockClient(id);
      })
  }

  removeStockClient(id) {
    var newStocks = this.state.stocks.filter((stock) => {
      return stock.id != id;
    });

    this.setState({ stocks: newStocks });
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock =>
              <tr key={stock.id}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>
                  <div className="text-center">
                    <Button
                      bsStyle="danger"
                      onClick={() => this.handleDeleteStock(stock.id)}
                    >
                    <span className="glyphicon glyphicon-trash"></span>
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}

export default Stocks;
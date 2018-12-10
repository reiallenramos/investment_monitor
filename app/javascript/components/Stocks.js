import React, { Fragment } from 'react'
import axios from 'axios'
import { Table, PageHeader, Button, ButtonGroup, Modal }from 'react-bootstrap'

var base_stocks_url = 'http://192.168.0.14:3000/api/v1';

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

class Stocks extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShowViewModal = this.handleShowViewModal.bind(this);
    this.handleCloseViewModal = this.handleCloseViewModal.bind(this);

    this.state = {
      stocks: [],
      showViewModal: false,
      current_stock: null
    }
  }

  componentDidMount() {
    axios.get(`${base_stocks_url}/stocks.json`)
      .then( res => {
        const stocks = res.data;
        this.setState({ stocks });
      })
  }

  handleCloseViewModal() {
    this.setState({ showViewModal: false });
  }

  handleShowViewModal(stock) {
    this.setState({ current_stock: stock });
    this.setState({ showViewModal: true });
  }

  handleDeleteStock(id) {
    axios.delete(`${base_stocks_url}/stocks/${id}.json`)
      .then(res => {
        console.log('successfully deleted!');
        this.removeStockClient(id);
        this.handleCloseViewModal();
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
    let viewModal;

    if (this.state.current_stock == null ) {
      viewModal = null
    } else {
      viewModal = (
        <Modal show={this.state.showViewModal} onHide={this.handleCloseViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.current_stock.symbol}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.state.current_stock.name}</Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleCloseViewModal}>Close</Button>
            <Button
              bsStyle="danger"
              onClick={() => this.handleDeleteStock(this.state.current_stock.id)}
              >
              <span className="glyphicon glyphicon-trash"></span>
            </Button>
          </Modal.Footer>
        </Modal>
      )
    }

    return (
      <Fragment>
        {viewModal}
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
                    <ButtonGroup>
                      <Button
                        bsStyle="info"
                        onClick={() => this.handleShowViewModal(stock)}
                      >
                      <span className="glyphicon glyphicon-eye-open"></span>
                      </Button>
                      <Button
                        bsStyle="danger"
                        onClick={() => this.handleDeleteStock(stock.id)}
                      >
                      <span className="glyphicon glyphicon-trash"></span>
                      </Button>
                    </ButtonGroup>
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
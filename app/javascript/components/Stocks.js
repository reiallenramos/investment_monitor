import React, { Fragment } from 'react'
import axios from 'axios'
import { Table, PageHeader, Button, ButtonGroup, Modal }from 'react-bootstrap'
import StockForm from './StockForm'
import { toast } from 'react-toastify'

var base_stocks_url = 'http://192.168.0.14:3000/api/v1';

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

class Stocks extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShowViewModal = this.handleShowViewModal.bind(this);
    this.handleCloseViewModal = this.handleCloseViewModal.bind(this);

    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);

    this.handleCreateStock = this.handleCreateStock.bind(this);
    this.handleUpdateStock = this.handleUpdateStock.bind(this);

    this.state = {
      stocks: [],
      showViewModal: false,
      current_stock: null,
      showForm: false,
      isEditing: false
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

  handleCloseForm() {
    this.setState({ showForm: false });
  }

  handleShowForm(stock, isEditing) {
    var empty_stock = {
      id: '',
      name: '',
      symbol: ''
    }

    this.setState({ current_stock: stock == null ? empty_stock : stock });
    this.setState({ showForm: true });
    this.setState({ isEditing: isEditing });
  }

  handleDeleteStock(id) {
    axios.delete(`${base_stocks_url}/stocks/${id}.json`)
      .then(res => {
        console.log('successfully deleted!');
        toast.success('Stock successfully Deleted!');
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

  handleCreateStock(newStock) {
    this.setState(prevState => ({
      stocks: [...prevState.stocks, newStock]
    }))
  }

  handleUpdateStock(updatedStock) {
    let stocksCopy = JSON.parse(JSON.stringify(this.state.stocks))
    var stockIndex = stocksCopy.findIndex(x => x.id === updatedStock.id)

    stocksCopy[stockIndex] = updatedStock

    this.setState({ stocks: stocksCopy })
  }

  render() {
    const { stocks } = this.state;
    let viewModal;

    const emptyStock = {
      name: '',
      symbol: ''
    }

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
        <h1>
          <StockForm stock={emptyStock} isEditing={false} handleCreateStock={this.handleCreateStock} />
        </h1>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th className="text-center">Symbol</th>
              <th className="text-center">Stock Name</th>
              <th className="text-center" width="35%">Actions</th>
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
                      <span className="glyphicon glyphicon-eye-open"></span><span className="hidden-xs"> View</span>
                      </Button>
                      <StockForm stock={stock} isEditing={true} handleUpdateStock={this.handleUpdateStock} />
                      <Button
                        bsStyle="danger"
                        onClick={() => this.handleDeleteStock(stock.id)}
                      >
                      <span className="glyphicon glyphicon-trash"></span><span className="hidden-xs"> Delete</span>
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
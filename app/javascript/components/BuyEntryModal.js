import React, { Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap'
import BuyEntryForm from './BuyEntryForm'
import axios from 'axios'
import * as constants from './constants'

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

class BuyEntryModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.onChange = this.onChange.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      show: false,
      currentUserId: this.props.currentUserId,
      stock_id: this.props.stock.id,
      name: this.props.stock.name,
      symbol: this.props.stock.symbol,
      tradeDate: new Date(),
      quantity: '',
      stockPrice: '',
      grossAmount: '',
      commAndVat: '',
      otherCharges: '',
      finalVat: '',
      netAmount: ''
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(date) {
    this.setState({ tradeDate: date });
    console.log('date changed',this.state.tradeDate);
  }

  onSubmit() {
    const buyEntry = {
      stock_id: this.state.stock_id,
      trade_date: this.state.tradeDate,
      user_id: this.state.currentUserId,
      quantity: this.state.quantity,
      stockPrice: this.state.stockPrice,
      grossAmount: this.state.grossAmount,
      commAndVat: this.state.commAndVat,
      otherCharges: this.state.otherCharges,
      finalVat: this.state.finalVat,
      netAmount: this.state.netAmount
    }

    console.log('Form submitted:', buyEntry);
    axios.post(`${constants.REQUEST_URL}/buy_entries.json`, { buyEntry })
      .then(res => {
        if (res.data.message) {
        } else {
        }
      })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { name, symbol, tradeDate, quantity, stockPrice, grossAmount, commAndVat, otherCharges, finalVat, netAmount } = this.state;

    return (
      <Fragment>
        <Button
          bsStyle='success'
          onClick={this.handleShow}
          >
          <span className="glyphicon glyphicon-plus"></span> Add Buy Entry
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>New Buy Entry
            </Modal.Title>
              <small>{name} ({symbol})</small>
          </Modal.Header>

          <Modal.Body>
            <BuyEntryForm
              onChange={this.onChange}
              handleDateChange={this.handleDateChange}
              tradeDate={tradeDate}
              quantity={quantity}
              stockPrice={stockPrice}
              grossAmount={grossAmount}
              commAndVat={commAndVat}
              otherCharges={otherCharges}
              finalVat={finalVat}
              netAmount={netAmount}
              />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.onSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    )
  }
}

export default BuyEntryModal;
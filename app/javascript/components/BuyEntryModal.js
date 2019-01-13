import React, { Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap'
import BuyEntryForm from './BuyEntryForm'

class BuyEntryModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      show: false,
      name: this.props.stock.name,
      symbol: this.props.stock.symbol,
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

  onSubmit() {
    console.log('Form submitted:', this.state);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { name, symbol, quantity, stockPrice, grossAmount, commAndVat, otherCharges, finalVat, netAmount } = this.state;

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
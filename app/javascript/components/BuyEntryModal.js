import React, { Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap'
import BuyEntryForm from './BuyEntryForm'
import { toast } from 'react-toastify'
import myAxios from './requests'

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
      form: {
        userId: this.props.currentUserId,
        stockId: this.props.stock.id,
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
  }

  onChange(e) {
    this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
  }

  handleDateChange(date) {
    this.setState({ form: { ...this.state.form, tradeDate: date } });
    console.log('date changed',this.state.form.tradeDate);
  }

  onSubmit() {
    const buyEntry = this.state.form;
    console.log('submitting...', buyEntry);
    console.log('Form submitted:', buyEntry);
    myAxios.post(`buy_entries.json`, { buyEntry })
    .then(res => {
      if (res.data.message) {
        toast.error('Error in creating Buy Entry!');
      } else {
        toast.success('Buy Entry Created!');
        this.handleClose();
        buyEntry['type'] = 'BUY';
        this.props.handleCreateBuyEntry(buyEntry);
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
    const { name, symbol } = this.state;
    const { tradeDate, quantity, stockPrice, grossAmount, commAndVat, otherCharges, finalVat, netAmount } = this.state.form;

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
import React, { Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap'
import BuyEntryForm from './BuyEntryForm'

class BuyEntryModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      stock: this.props.stock
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { stock } = this.state;

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
              <small>{stock.name} ({stock.symbol})</small>
          </Modal.Header>

          <Modal.Body>
            <div>--form goes here--</div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleCloseForm}>Cancel</Button>
            <Button type="submit" bsStyle="success">Submit</Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    )
  }
}

export default BuyEntryModal;
import React, { Fragment } from 'react'
import { FormGroup, FormControl, ControlLabel, Modal, Button } from 'react-bootstrap'

class StockForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSymbolChange = this.handleSymbolChange.bind(this);

    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: this.props.stock.id,
      name: this.props.stock.name,
      symbol: this.props.stock.symbol,

      showForm: false,
      isEditing: this.props.isEditing
    }
  }

  handleCloseForm() {
    this.setState({ showForm: false });
  }

  handleShowForm() {
    this.setState({ showForm: true });
  }

  handleNameChange(evt) {
    this.setState({ name: evt.target.value });
  }

  handleSymbolChange(evt) {
    this.setState({ symbol: evt.target.value });
  }

  handleSubmit(e) {
    alert('submit triggered!');
    e.preventDefault();
  }

  render() {
    let modalTitle = this.state.isEditing ? "Edit Stock" : "New Stock"
    let buttonStyle = this.state.isEditing ? "default" : "primary";
    let buttonLabel = this.state.isEditing ? "" : " Create Stock";
    let buttonClasses = this.state.isEditing ? "glyphicon glyphicon-pencil" : "glyphicon glyphicon-plus"
    let submitButtonLabel = this.state.isEditing ? "Update" : "Submit"

    return (
      <Fragment>
        <Button
            bsStyle={buttonStyle}
            onClick={() => this.handleShowForm(null)}
          >
          <span className={buttonClasses}></span>{buttonLabel}
        </Button>

        <Modal show={this.state.showForm} onHide={this.handleCloseForm}>
          <form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalTitle}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
                </FormGroup>
                <FormGroup>
                <ControlLabel>Symbol</ControlLabel>
                <FormControl
                  name="symbol"
                  type="text"
                  value={this.state.symbol}
                  onChange={this.handleSymbolChange}
                />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleCloseForm}>Discard</Button>
              <Button type="submit" bsStyle="success">{submitButtonLabel}</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Fragment>
    )
  }
}

export default StockForm;
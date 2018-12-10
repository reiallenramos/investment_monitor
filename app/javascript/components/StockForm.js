import React, { Fragment } from 'react'
import { FormGroup, FormControl, ControlLabel }from 'react-bootstrap'

class StockForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSymbolChange = this.handleSymbolChange.bind(this);

    this.state = {
      name: this.props.stock.name,
      symbol: this.props.stock.symbol
    }
  }

  handleNameChange(evt) {
    this.setState({ name: evt.target.value });
  }

  handleSymbolChange(evt) {
    this.setState({ symbol: evt.target.value });
  }

  render() {
    return (
      <Fragment>
        <form>
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
        </form>
      </Fragment>
    )
  }
}

export default StockForm;
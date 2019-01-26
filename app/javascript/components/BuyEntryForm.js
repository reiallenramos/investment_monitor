import React, { Fragment } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";
import "../stylesheets/datepicker.css";

class BuyEntryForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { tradeDate, quantity, stockPrice, grossAmount, commAndVat, otherCharges, finalVat, netAmount, onChange, handleDateChange } = this.props;

    return (
      <Fragment>
        <Form horizontal>
          <FormGroup controlId="buyEntryFormQuantity">
            <Col componentClass={ControlLabel} xs={2} sm={3}>
              Trade Date
            </Col>
            <Col xs={4} sm={3}>
              <DatePicker
                selected={tradeDate}
                onChange={handleDateChange}
                name="tradeDate"
                className="form-control"
              />
            </Col>
            <Col componentClass={ControlLabel} xs={3}>
              Quantity
            </Col>
            <Col xs={3}>
              <FormControl
                type="number"
                placeholder="0"
                min={0}
                name="quantity"
                value={quantity}
                onChange={onChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="buyEntryFormStockPrice">
            <Col componentClass={ControlLabel} sm={3}>
              Stock Price
            </Col>
            <Col sm={9}>
              <FormControl
                type="number"
                placeholder="0.00"
                min={0}
                name="stockPrice"
                value={stockPrice}
                onChange={onChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="buyEntryFormGrossAmount">
            <Col componentClass={ControlLabel} sm={3}>
              Gross Amount
            </Col>
            <Col sm={9}>
              <FormControl
                type="number"
                placeholder="0.00"
                min={0}
                name="grossAmount"
                value={grossAmount}
                onChange={onChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="buyEntryFormCommAndVat">
            <Col componentClass={ControlLabel} sm={3}>
              Comm and Vat
            </Col>
            <Col sm={9}>
              <FormControl
                type="number"
                placeholder="0.00"
                min={0}
                name="commAndVat"
                value={commAndVat}
                onChange={onChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="buyEntryFormOtherCharges">
            <Col componentClass={ControlLabel} sm={3}>
              Other Charges
            </Col>
            <Col sm={9}>
              <FormControl
                type="number"
                placeholder="0.00"
                min={0}
                name="otherCharges"
                value={otherCharges}
                onChange={onChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="buyEntryFormFinalVat">
            <Col componentClass={ControlLabel} sm={3}>
              Final Vat
            </Col>
            <Col sm={9}>
              <FormControl
                type="number"
                placeholder="0.00"
                min={0}
                name="finalVat"
                value={finalVat}
                onChange={onChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="buyEntryFormNetAmount">
            <Col componentClass={ControlLabel} sm={3}>
              Net Amount
            </Col>
            <Col sm={9}>
              <FormControl
                type="number"
                placeholder="0.00"
                min={0}
                name="netAmount"
                value={netAmount}
                onChange={onChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    )
  }
}

export default BuyEntryForm;
import React, { Component } from 'react'
import { Panel, Button } from 'react-bootstrap'

class TradingHistoryPanel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: true,
      name: this.props.stock.name,
      symbol: this.props.stock.symbol
    };
  }

  render() {
    return (
      <div>
        <Panel id="collapsible-panel-example-2" defaultExpanded bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title toggle>
              <div>
                {this.state.symbol}
                <div className='pull-right'>{this.state.name}</div>
              </div>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Panel.Body>
            <Panel.Footer>
              <Button
                bsStyle='success'
                >
                <span className="glyphicon glyphicon-plus"></span> Add Buy Entry
              </Button>
            </Panel.Footer>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export default TradingHistoryPanel;
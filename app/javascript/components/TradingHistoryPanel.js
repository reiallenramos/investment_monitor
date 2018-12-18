import React, { Component } from 'react'
import { Panel, Button } from 'react-bootstrap'
import TradingHistoryTable from './TradingHistoryTable'

class TradingHistoryPanel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: true,
      id: this.props.stock.id,
      name: this.props.stock.name,
      symbol: this.props.stock.symbol,
      currentUserId: this.props.currentUserId
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
             <TradingHistoryTable stockId={this.state.id} currentUserId={this.state.currentUserId} />
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
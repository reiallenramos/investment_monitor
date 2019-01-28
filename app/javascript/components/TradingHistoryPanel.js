import React, { Component } from 'react'
import { Panel, Button } from 'react-bootstrap'
import TradingHistoryTable from './TradingHistoryTable'
import BuyEntryModal from './BuyEntryModal'
import myAxios from './requests'
import { toast } from 'react-toastify'

class TradingHistoryPanel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleCreateBuyEntry = this.handleCreateBuyEntry.bind(this);
    this.handleDeleteBuyEntry = this.handleDeleteBuyEntry.bind(this);

    this.state = {
      open: true,
      stock: this.props.stock,
      stockId: this.props.stock.id,
      name: this.props.stock.name,
      symbol: this.props.stock.symbol,
      currentUserId: this.props.currentUserId,
      buyEntries: null
    };
  }

  componentDidMount() {
    myAxios.get(`/buy_entries/by_user_and_stock.json?user_id=${this.state.currentUserId}&stock_id=${this.state.stockId}`)
    .then( res => {
      var buyEntries = res.data;

      buyEntries.forEach((entry) => {
        entry.type = 'BUY'
      })

      this.setState({ buyEntries });
    })
  }

  handleCreateBuyEntry(newBuyEntry) {
    this.setState(prevState => ({
      buyEntries: [newBuyEntry].concat(prevState.buyEntries)
    }));
  }

  handleDeleteBuyEntry = (buyEntryId) =>{
    myAxios.delete(`buy_entries/${buyEntryId}.json`)
      .then(res => {
        console.log('successfully deleted!');
        toast.success('Buy Entry successfully Deleted!');
        // this.removeStockClient(buyEntryId);
        // this.handleCloseViewModal();
      })
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
             <TradingHistoryTable stockId={this.state.stockId} currentUserId={this.state.currentUserId} buyEntries={this.state.buyEntries} handleDeleteBuyEntry={this.handleDeleteBuyEntry} />
            </Panel.Body>
            <Panel.Footer>
              <BuyEntryModal stock={this.state.stock} currentUserId={this.state.currentUserId} handleCreateBuyEntry={this.handleCreateBuyEntry} />
            </Panel.Footer>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export default TradingHistoryPanel;
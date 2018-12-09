class StocksController < ApplicationController
  def index
    stocks = Stock.all.order('symbol ASC')
    render json: stocks.to_json
  end
end

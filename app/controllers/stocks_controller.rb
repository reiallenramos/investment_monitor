class StocksController < ApplicationController
  def index
    stocks = Stock.all
    render json: stocks.to_json
  end
end

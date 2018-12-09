class Api::V1::StocksController < Api::V1::BaseController
  def index
    respond_with Stock.all.order('symbol ASC')
  end
end

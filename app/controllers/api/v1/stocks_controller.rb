class Api::V1::StocksController < Api::V1::BaseController
  before_action :set_stock, only: %i[destroy]
  skip_before_action :verify_authenticity_token

  def index
    respond_with Stock.all.order('symbol ASC')
  end

  def destroy
    respond_with @stock.destroy
  end

  private

    def set_stock
      @stock = Stock.find(params[:id])
    end
end

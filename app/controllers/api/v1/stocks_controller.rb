class Api::V1::StocksController < Api::V1::BaseController
  before_action :set_stock, only: %i[destroy]
  skip_before_action :verify_authenticity_token

  def index
    respond_with Stock.all.order('symbol ASC')
  end

  def new
    respond_with Stock.new
  end

  def create
    @stock = Stock.new(stock_params)

    if @stock.save
      render json: @stock.to_json
    else
      render json: { status: "error", message: @stock.errors }
    end
  end

  def destroy
    respond_with @stock.destroy
  end

  private
    def stock_params
      params.require(:stock).permit(
        :name,
        :symbol
      )
    end

    def set_stock
      @stock = Stock.find(params[:id])
    end
end

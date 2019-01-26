class Api::V1::BuyEntriesController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token
  before_action :set_stock, :set_user, only: [:by_user_and_stock]

  def index
    respond_with BuyEntry.all
  end

  def by_user_and_stock
    respond_with BuyEntry.by_user(@user.id).by_stock(@stock.id).order('trade_date DESC')
  end

  def create
    @buy_entry = BuyEntry.new(buy_entry_params)
    @buy_entry[:trade_date] = parse_date
    if @buy_entry.save
      render json: @buy_entry
    else
      render json: { status: "error", message: @buy_entry.errors }
    end
  end

  private
    def buy_entry_params
      params.require(:buy_entry).permit(
        :stock_id,
        :user_id,
        :stock_price,
        :trade_date,
        :quantity,
        :gross_amount,
        :net_amount,
        :comm_and_vat,
        :other_charges,
        :final_vat
      )
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    def set_stock
      @stock = Stock.find(params[:stock_id])
    end

    def parse_date
      DateTime.parse(@buy_entry[:trade_date].to_s)
    end
end

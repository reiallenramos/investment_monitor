class Api::V1::EntriesController < Api::V1::BaseController
  before_action :set_user, :set_stock, only: :buy_and_sell_entries

  def buy_and_sell_entries
    buys = BuyEntry.by_user(@user.id).by_stock(@stock.id)
    sells = [] # wip

    entries = buys + sells
    respond_with entries
  end

  private
    def set_user
      @user = User.find(params[:user_id])
    end

    def set_stock
      @stock = Stock.find(params[:stock_id])
    end
end
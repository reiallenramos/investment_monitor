class Api::V1::SellEntriesController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token
  before_action :set_stock, :set_user, only: [:by_user_and_stock]

  def index
    respond_with SellEntry.all
  end

  def by_user_and_stock
    respond_with SellEntry.by_user(@user.id).by_stock(@stock.id)
  end

  private
    def set_user
      @user = User.find(params[:user_id])
    end

    def set_stock
      @stock = Stock.find(params[:stock_id])
    end
end

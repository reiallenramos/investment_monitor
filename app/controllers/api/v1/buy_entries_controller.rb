class Api::V1::BuyEntriesController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token

  def index
    respond_with BuyEntry.all
  end
end

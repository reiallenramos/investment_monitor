class Api::V1::SellEntriesController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token

  def index
    respond_with SellEntry.all
  end
end

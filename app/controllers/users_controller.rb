class UsersController < ApplicationController
  def check_for_user
    render json: my_user.to_json
  end

  private
    def my_user
      User.find_by_email("reiallenramos@gmail.com")
    end
end

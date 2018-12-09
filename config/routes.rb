Rails.application.routes.draw do
  get 'welcome/index'
  get '/users/check_for_user' => "users#check_for_user"

  devise_for :users
  root 'welcome#index'
end

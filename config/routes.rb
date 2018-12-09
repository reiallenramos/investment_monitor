Rails.application.routes.draw do
  get 'welcome/index'
  get '/users/check_for_user' => "users#check_for_user"

  namespace :api do
    namespace :v1 do
      resources :stocks
    end
  end

  devise_for :users
  root 'welcome#index'
  match '*path', to: 'welcome#index', via: :all
end

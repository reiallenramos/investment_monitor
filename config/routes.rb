Rails.application.routes.draw do
  get 'welcome/index'
  get '/users/check_for_user' => "users#check_for_user"

  namespace :api do
    namespace :v1 do
      resources :stocks do
        collection do
          get :stock_history_by_user
        end
      end
      get '/buy_and_sell_entries' => 'entries#buy_and_sell_entries'
      resources :buy_entries
    end
  end

  devise_for :users
  root 'welcome#index'
  match '*path', to: 'welcome#index', via: :all
end

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
      resources :buy_entries, only: [:index, :create, :destroy] do
        collection do
          get :by_user_and_stock
        end
      end
      resources :sell_entries do
        collection do
          get :by_user_and_stock
        end
      end
    end
  end

  devise_for :users
  root 'welcome#index'
  match '*path', to: 'welcome#index', via: :all
end

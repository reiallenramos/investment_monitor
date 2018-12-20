class Stock < ApplicationRecord
  has_many :buy_entries
  has_many :sell_entries

  validates_presence_of :name, :symbol, allow_blank: false
  validates_uniqueness_of :name, :symbol

  # returns array of unique Stocks that user has interacted with (buy and/or sell)
  def self.stock_history_of(user)
    stock_ids = user.buy_entries.map(&:stock_id).uniq
    # stock_ids << user.sell_entries.map(&:stock_id).uniq

    Stock.where(id: [stock_ids])
  end
end

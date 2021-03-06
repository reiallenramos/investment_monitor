class SellEntry < ApplicationRecord
  belongs_to :user
  belongs_to :stock

  validates_presence_of :stock_id, :user_id, :trade_date, :quantity,
    :stock_price, :gross_amount, :net_amount
  validates_numericality_of :quantity, only_integer: true, greater_than_or_equal_to: 0
  validates_numericality_of :stock_price, :gross_amount, :net_amount, greater_than: 0
  validates_numericality_of :comm_and_vat, :other_charges, :final_vat

  scope :by_user,->(user_id) { where('user_id = ?', user_id) }
  scope :by_stock, ->(stock_id) { where('stock_id = ?', stock_id) }
end

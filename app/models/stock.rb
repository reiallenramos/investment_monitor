class Stock < ApplicationRecord
  has_many :buy_entries

  validates_presence_of :name, :symbol, allow_blank: false
  validates_uniqueness_of :name, :symbol
end

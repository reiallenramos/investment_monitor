class CreateBuyEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :buy_entries do |t|
      t.integer :stock_id
      t.integer :user_id
      t.datetime :trade_date
      t.integer :quantity
      t.decimal :stock_price
      t.decimal :gross_amount, default: 0.0
      t.decimal :comm_and_vat, default: 0.0
      t.decimal :other_charges, default: 0.0
      t.decimal :final_vat, default: 0.0
      t.decimal :net_amount, default: 0.0

      t.timestamps
    end
  end
end

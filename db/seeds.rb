require 'csv'

def create_rap_user
  u = User.create(
    email: "reiallenramos@gmail.com",
    password: "123123"
  )
  puts "RAP user created" if u.save
end

def seed_stocks
  csv_text = File.read(Rails.root.join('lib', 'seeds', 'stocks.csv'))
  csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')

  csv.each do |row|
    s = Stock.new
    s.symbol = row['symbol']
    s.name = row['name']

    puts "<#{s.symbol}> #{s.name} saved" if s.save
  end
end

def seed_buy_entries
  buy_entry_params = {
    stock_id: nil,
    user_id: 1,
    quantity: 10,
    stock_price: 100,
    trade_date: Time.zone.now,
    gross_amount: 1000,
    net_amount: 1000
  }

  Stock.all.each do |stock|
    params = buy_entry_params.clone
    params.merge!(stock_id: stock.id)
    puts "Buy Entry created for #{stock.name}" if BuyEntry.create!(params)
  end
end

case Rails.env
when "development"
  create_rap_user
  seed_stocks
  seed_buy_entries
when "production"
end
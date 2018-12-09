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

case Rails.env
when "development"
  create_rap_user
  seed_stocks
when "production"
end
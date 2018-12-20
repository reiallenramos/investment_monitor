# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_20_013352) do

  create_table "buy_entries", force: :cascade do |t|
    t.integer "stock_id"
    t.integer "user_id"
    t.datetime "trade_date"
    t.integer "quantity"
    t.decimal "stock_price"
    t.decimal "gross_amount", default: "0.0"
    t.decimal "comm_and_vat", default: "0.0"
    t.decimal "other_charges", default: "0.0"
    t.decimal "final_vat", default: "0.0"
    t.decimal "net_amount", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sell_entries", force: :cascade do |t|
    t.integer "stock_id"
    t.integer "user_id"
    t.datetime "trade_date"
    t.integer "quantity"
    t.decimal "stock_price"
    t.decimal "gross_amount", default: "0.0"
    t.decimal "comm_and_vat", default: "0.0"
    t.decimal "other_charges", default: "0.0"
    t.decimal "final_vat", default: "0.0"
    t.decimal "net_amount", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stocks", force: :cascade do |t|
    t.string "name"
    t.string "symbol"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end

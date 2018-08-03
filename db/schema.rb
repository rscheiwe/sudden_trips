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

ActiveRecord::Schema.define(version: 2018_08_03_175926) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.bigint "review_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["review_id"], name: "index_comments_on_review_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "likes"
    t.bigint "suddentrip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["suddentrip_id"], name: "index_reviews_on_suddentrip_id"
  end

  create_table "suddentrips", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "location"
    t.integer "rating"
    t.string "date"
    t.json "destinations"
    t.string "visits"
  end

  create_table "user_suddentrips", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "suddentrip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["suddentrip_id"], name: "index_user_suddentrips_on_suddentrip_id"
    t.index ["user_id"], name: "index_user_suddentrips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comments", "reviews"
  add_foreign_key "reviews", "suddentrips"
end

# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150409223518) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "identities", ["user_id"], name: "index_identities_on_user_id", using: :btree

  create_table "listings", force: :cascade do |t|
    t.integer  "owner_id"
    t.string   "title"
    t.string   "tagline"
    t.integer  "accomodates"
    t.integer  "price"
    t.integer  "currency_id"
    t.text     "description"
    t.text     "rules"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.integer  "minimum_stay"
    t.boolean  "availability_default"
  end

  add_index "listings", ["currency_id"], name: "index_listings_on_currency_id", using: :btree
  add_index "listings", ["owner_id"], name: "index_listings_on_owner_id", using: :btree

  create_table "location_aliases", force: :cascade do |t|
    t.integer  "location_id"
    t.string   "name"
    t.integer  "area_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "location_aliases", ["area_id"], name: "index_location_aliases_on_area_id", using: :btree
  add_index "location_aliases", ["location_id"], name: "index_location_aliases_on_location_id", using: :btree

  create_table "location_mappings", force: :cascade do |t|
    t.integer  "listing_id"
    t.integer  "location_alias_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "location_mappings", ["listing_id"], name: "index_location_mappings_on_listing_id", using: :btree
  add_index "location_mappings", ["location_alias_id"], name: "index_location_mappings_on_location_alias_id", using: :btree

  create_table "locations", force: :cascade do |t|
    t.integer  "longitude"
    t.integer  "latitude"
    t.integer  "size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "photos", force: :cascade do |t|
    t.integer  "listing_id",                 null: false
    t.integer  "user_id"
    t.string   "photo_url",                  null: false
    t.string   "thumb_url",                  null: false
    t.boolean  "verified",   default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "main"
  end

  add_index "photos", ["listing_id"], name: "index_photos_on_listing_id", using: :btree
  add_index "photos", ["user_id"], name: "index_photos_on_user_id", using: :btree
  add_index "photos", ["verified"], name: "index_photos_on_verified", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "session_token"
    t.string   "ua_info"
    t.string   "remote_ip"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.boolean  "guest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", using: :btree

  add_foreign_key "identities", "users"
  add_foreign_key "sessions", "users"
end

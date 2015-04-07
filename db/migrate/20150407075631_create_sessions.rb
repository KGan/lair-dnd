class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.references :user, index: true
      t.string :session_token
      t.string :ua_info
      t.string :access_ip

      t.timestamps null: false
    end
    add_index :sessions, :session_token
    add_foreign_key :sessions, :users
  end
end

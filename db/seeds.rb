# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.destroy_all
Listing.destroy_all

User.create(username: 'Keving', email: 'Keving', password: 'password')

10.times do
  User.create(username: Faker::Internet.user_name,
              email: Faker::Internet.safe_email,
              password: Faker::Internet.password(7,15))
end

100.times do
  Listing.create(owner_id: rand(User.count),
                 title: Faker::Lorem.words(4, true),
                 accomodates: rand(5),
                 price: rand(20,500),
                 description: Faker::Lorem.paragraphs
                 rules: Faker::Lorem.paragraphs
                 )

end

Session.destroy_all
User.destroy_all
Listing.destroy_all

User.create(username: 'Keving', email: 'Keving', password: 'password')

10.times do
  User.create(username: Faker::Internet.user_name,
              email: Faker::Internet.safe_email,
              password: Faker::Internet.password(7,15))
end



100.times do
  l = Listing.create(owner_id: rand(User.count),
                 title: Faker::Lorem.words(4, true).join(' '),
                 accomodates: rand(5),
                 price: rand(20..500),
                 description: Faker::Lorem.paragraphs.join("\n"),
                 rules: Faker::Lorem.paragraphs.join("\n"),
                 availability_default: 1,
                 minimum_stay: rand(1..5),
                 bedrooms: rand(1..5),
                 beds: rand(2..5),
                 bathrooms: rand(2..5),
                 housing_type: Listing::TYPES.sample,
                 checkin: Time.at(rand(3.hours.ago..Time.now)),
                 checkout: Time.now + rand(60 * 60 * 3)
                 )
  Amenity.create(
    listing_id: l.id,
    internet: true,
    kitchen: true,
    tv: true,
    dungeon: (rand(3) < 1) ? true : false,
    moat: (rand(3) < 1) ? true : false,
    secret_passages: (rand(3) < 1) ? true : false,
    random_monsters: (rand(3) < 1) ? true : false,
    endless_dungeons: (rand(3) < 1) ? true : false,
    dragons: (rand(3) < 1) ? true : false,
    maze: (rand(3) < 1) ? true : false,
    treasure: (rand(3) < 1) ? true : false,
    high_tower_room: (rand(3) < 1) ? true : false,
    grand_library: (rand(3) < 1) ? true : false
  )

end

300.times do
  listing = Listing.find(rand(Listing.count) + 1)
  tail = Faker::Lorem.words(3, true).join(' ')
  Photo.create(user_id: listing.owner_id,
               listing_id: listing.id,
               photo_url: "http://placehold.it/770x300&text=#{tail}",
               thumb_url: "http://placehold.it/170x100&text=#{tail}",
               verified: true
              )

end

Listing.all.each do |listing|
  if listing.photos
    randphoto = listing.photos[rand(listing.photos.length)]
    randphoto.main = true if randphoto
  end
end


User.all.each do |user|
  photos = Photo.where(user_id: user.id)
  user.profile_photo_id = photos[rand(photos.count)].id if photos.count > 0
end

json.extract! listing, :id, :title, :tagline, :price
json.main_photo_url listing.main_photo do |p|
  json.extract! p, :id, :photo_url
end
json.user_photo_url listing.user.profile_photo do |p|
  json.extract! p, :id, :photo_url
end

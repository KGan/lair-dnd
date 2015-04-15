json.extract! listing, :id, :title, :tagline, :price, :housing_type
json.main_photo_url listing.main_photo.try(:photo_url)
json.user_photo_url listing.user.profile_photo.try(:photo_url)
json.location_name listing.location_alias.name
json.location [listing.location_alias.location.latitude, listing.location_alias.location.longitude]

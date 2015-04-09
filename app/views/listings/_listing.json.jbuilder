json.extract! listing, *attributes
json.photos listing.photos do |photo|
  json.partial! 'photos/photo', photo: photo
end

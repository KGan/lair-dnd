json.extract! review, :id, :comment, :rating
json.user do
  json.id review.user.id
  json.email review.user.email
  json.profile_picture review.user.profile_photo.thumb_url
end

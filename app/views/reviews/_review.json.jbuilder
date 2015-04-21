json.extract! review, :id, :comment, :rating
json.user review.user do |user|
  json.id user.id
  json.email user.email
end 

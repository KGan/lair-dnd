json.partial! 'listings/listing', listing: @listing, attributes: @listing.class.column_names.map(&:to_sym)
json.user do
  json.partial! 'users/user', user: @listing.user, attributes: [:id, :email]
end

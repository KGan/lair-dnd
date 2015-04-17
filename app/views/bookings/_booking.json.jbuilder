json.booking do
  json.id booking.id
  json.dtstart booking.dtstart.to_date
  json.dtend booking.dtend.to_date
  json.guests booking.guests
  json.listing_id booking.listing_id
end

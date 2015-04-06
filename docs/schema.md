# Schema Information
?? denotes optional complexities not necessary in the pure mvp

## residence
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
tagline     | string    | (optional)
maxguests   | integer   | not null
price       | integer    | not null (may need extra table if multiple currencies)
currency_id | integer    | not null, fk references currencies
description | string    | not null
rules       | string    | not null

##availability ??
column name | data type | details
------------|-----------|-----------------------
id          | integer   | pk, not null
residence_id| integer   | fk not null (ref: residences)
dtstart     | date      | not null
dtend       | date      | not null
blocktype   | str/bool  | 0/1 or string denoting block as 'available' or 'unavailable'

## photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | pk, not null
residence_id| integer   | fk not null (ref: residences)
photo_url   | string    | not null
verified    | int(0/1)bool | not null

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | pk, not null
residence_id| integer   | fk not null (ref: residences)
stars       | integer   | 0-5 not null (for various fields like value/cleanliness/communication/location/accuracy)
text        | string    | not null

## reservations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
residence_id     | integer   | not null, foreign key (references residence)
user_id | integer   | not null, foreign key (references users)
dtstart | date      | not null
dtend   | date      | not null
guests  | integer   | not null

## locations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
longitude   | integer   | not null
latitude    | integer   | not null
size        | integer   | not null ( defines the radius from the point)

## location mappings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
space_id          | integer   | not null, foreign key
location_alias_id          | integer   | not null, foreign key

## location aliases
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
location_id          | integer   | not null, foreign key references location
name          | string   | not null
area_id          | integer   | not null, fk references location_aliases

## tags ??
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings ??
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
residence_id      | integer   | not null, foreign key (references residence)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

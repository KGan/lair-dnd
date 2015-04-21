# == Schema Information
#
# Table name: listings
#
#  id                   :integer          not null, primary key
#  owner_id             :integer
#  title                :string
#  tagline              :string
#  accomodates          :integer
#  price                :integer
#  currency_id          :integer
#  description          :text
#  rules                :text
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  minimum_stay         :integer
#  availability_default :boolean
#  housing_type         :string
#  bedrooms             :integer
#  beds                 :integer
#  bathrooms            :integer
#  checkin              :time
#  checkout             :time
#  pending              :boolean          default(TRUE)
#

class Listing < ActiveRecord::Base
  include Geokit::Geocoders
  PER_PAGE = 20
  TYPES = ['house', 'apartment', 'room', 'studio']
  belongs_to :user, class_name: 'User', primary_key: :id, foreign_key: :owner_id
  validates_presence_of :user, :title, :accomodates, :price, :description
  validates :housing_type, inclusion: {in: TYPES}
  has_one :amenity, primary_key: :id, foreign_key: :listing_id, dependent: :destroy
  has_one :location_mapping, dependent: :destroy
  has_one :location_alias, through: :location_mapping
  has_many :photos, dependent: :destroy
  has_many :reviews
  acts_as_mappable through: {location_alias: :location}
  def is_owner?(u)
    !!(u.id == self.owner_id)
  end

  def main_photo
    return unless self.photos
    a = self.photos.where(:main => true).first
    a ? a : self.photos.first
  end

  def self.by_location(orig, range)
    if orig
      if found_loc = LocationAlias.find_by_name(orig)
        origin = [found_loc.location.latitude, found_loc.location.longitude]
      elsif orig.is_a?(String)
        decoded = MultiGeocoder.geocode(origin)
        if (decoded.success)
          origin = [decoded.lat, decoded.lng]
        else
          puts 'failed decode'
          return self
        end
      else
        origin = orig.map(&:to_f)
      end
      self.within(range, origin: origin)
    else
      puts 'no origin'
      self
    end
  end

  def self.within(*args)
    super(*args).includes(location_alias: :location).references(:location)
  end

  def self.search(query, cid)
    query = query['search']
    scope = Listing
    scope = scope.where.not(owner_id: cid, pending: true)
    range = query['range'] || 10
    page = query['page'] || 1
    loc = query['location']
    scope = scope.by_location(loc, range)
    scope.offset(( page - 1 ) * Listing::PER_PAGE).limit(Listing::PER_PAGE)
  end


  def self.parsed_columns
    basics = ['title','housing_type', 'accomodates', 'bedrooms', 'price' ,'location', 'photos', 'description', 'rules']
    {
      basics: basics,
      amenities: Amenity.column_names - ['id', 'created_at', 'updated_at', 'listing_id'],
      complete: self.column_names -
          ['id', 'created_at', 'updated_at'] +
          ['photos', 'location'],
      rest: ['checkin', 'checkout', 'availability_default']
    }
  end
end

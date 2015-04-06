# Phase 2: Locations and Availability

## Rails
### Models
* Location
* LocationAlias
* LocationMapping
* Availability

### Controllers
Api::LocationsController (create, destroy, index, show)
Api::LocationsAliasController (create, destroy, show, update)
Api::AvailabilityController (create, destroy, show)

### Views
* location/show.json.jbuilder
* location/index.json.jbuilder + partials

## Backbone
### Models
* location

### Collections
* locations

### Views
* locForm
* locAliasShow (composite view, contains PostsIndex subview)
* availableIndex (composite view, contains PostsIndexItem subviews)
* availabilityform

## Gems/Libraries
* google maps api
* custom maps projections
* interactjs

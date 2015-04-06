# Phase 1: User Authentication, Basic Listing

## Rails
### Models
* User
* Residence/listing
* Space
* tag/ taggings
* Photos

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* ResidencesController (create, new, show)
* SpacesController (create, new, show)
* TagsController (create, new, show)
* photos

### Views
* users/new.html.erb
* session/new.html.erb
* residences/new.html.erb
* tags/show.html.erb

## Backbone

### Models
* Residence
* tag
* photo

### Collections
* Residences/Spaces <-these may become same
* tags
* photos

### Views
* photos form
* residence show/form

## Gems/Libraries
filepicker.js
bootstrap
devise-oauth

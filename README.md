# AirDnD

![logo]
[logo]: ./docs/wireframes/logo.png

[Site link][heroku]

[heroku]:http://lairdnd.com

## Minimum Viable Product
LairDnD is a ABNB clone that sets prospective videogame and movie villains up with
state of the art lairs and dungeons

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Guest Account
- [x] Create sessions (log in)
- [x] Create Residence
- [x] Post Residence Details
- [x] Mark Residence on Map
- [x] View Residences/Photos/etc
 - [x] Photo and Photo Carousel
 - [x] Basic info
 - [x] details + amenities
- [x] Leave Comments on places
- [x] Ratings/Reviews
- [x] Search for places by
 - [x] location
 - [ ] price
 - [ ] review-restricted
 - [ ] accomodations
- [x] Reservation system / Booking conflict resolutions


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Listing Creation (~1 day)
I will implement basic user authentication, login and creation of
sessions. Details and Amenities, taggings, etc should be done. Full Front and Back End of Auth as well as apis for listing/space creation.
Will be using a standard filepicker in order to upload images to a cache(ing website?). Barebone frontend forms should be done by this point too, with zero styling. May use bootstrap modals to get login up.

[Details][phase-one]

### Phase 2: Locations and Availability (3~4 days)
API and Frontend interaction of locations, maps and availability on the calendar. Implementation of the booking, algorithms for resolution of conflicts and fully functional location searching (without frontend maybe) should be done. By the end of the phase, there should be the full ability to compose a complete LairDND listing to book.Likely g-map apis will be involved.

[Details][phase-two]

### Phase 3: Searching and Browsing Listings (~2 days)
Properly show all information about Searched listings. Be able to search by location, browse in an area, etc. Involves a lot more Bckbone work and javascript libraries as well as clever api setups to allow for assisting user completion of areas. Allow for search by various criteria. this also involves rounding out essential show-features such as seeing map location and interacting with the photo gallery.

[Details][phase-three]

### Phase 4: Bookings (~1-2 day)
Relying on phase 2 to work properly for location based search. Resolve booking with listings availability and other bookings, try to submit bookings and get them working together with the search-listing. There are a few nuances. Allows the lister to confirm a pending reservation or set up autoaccept for completely free portions. Set up communication between the users, etc.

[Details][phase-four]

### Phase 5: Reviewing (~1 day)
Be able to add rating reviews and leave descriptive comments on the listing. Create JS views that are responsive and allow for star ratings, etc. Get the models sync'd via backbone as well. Allow users to redefine past ratings under conditions.

[Details][phase-five]

### Phase 6: Touchup (1-2 days)
Flush out transitions in css, Get all styling and things working smoothly. Round out feature flow and responsivity/ui-ux design in the important user-story for our guest. Seed with good data and setup an intro.js walkthrough for the guest to be onboarded.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Dashboard / User profile
- [ ] Alerts for tentative plans meeting filters
- [ ] Pagination/infinite scroll
- [ ] Activity history / FB/instag/twitter integration
- [ ] 'Neighborhoods'
- [ ] Reblogging
- [ ] Multiple sessions/session management
- [ ] User avatars
- [ ] Typeahead/fuzzy search bar
- [ ] Trust system
- [ ] Limited Special Offers

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md

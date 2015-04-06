# Flux-capacitr

[Heroku link][heroku]

[heroku]:herokuapp.com

## Minimum Viable Product
LairDnD is a ABNB clone that sets prospective videogame and movie villains up with
state of the art lairs and dungeons

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts / Guest Account
- [ ] Create sessions (log in)
- [ ] Create Residence
- [ ] Post Residence Details
- [ ] Mark Residence on Map
- [ ] View Residences/Photos/etc
- [ ] Leave Comments on places
- [ ] Ratings/Reviews
- [ ] Search for places by
 - [ ] location
 - [ ] price
 - [ ] review-restricted
 - [ ] accomodations
- [ ] Reservation system / Booking conflict resolutions


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Blog Creation (~1 day)
I will implement basic user authentication, login and creation of

[Details][phase-one]

### Phase 2: Viewing Blogs and Posts (~2 days)
I will add API routes to serve blog and post data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to create blogs and view both blogs and posts, all
inside a single Backbone app.

[Details][phase-two]

### Phase 3: Editing and Displaying Posts (~2 days)
I plan to use third-party libraries to add functionality to the `PostForm` and
`PostShow` views in this phase. First I'll need to add a Markdown editor to the
`PostForm`, and make sure that the Markdown is properly escaped and formatted in
the `PostShow` view. I also plan to integrate Filepicker for file upload so
users can add images to blog posts.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`subscribed_blogs` association to serve a list of blog posts ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose `posts`
collection fetches from the new route.  Ultimately, this will be the page users
see after logging in.

[Details][phase-four]

### Phase 5: Searching for Blogs and Posts (~2 days)
I'll need to add `search` routes to both the Blogs and Posts controllers. On the
Backbone side, there will be a `SearchResults` composite view has `BlogsIndex`
and `PostsIndex` subviews. These views will use plain old `blogs` and `posts`
collections, but they will fetch from the new `search` routes.

[Details][phase-five]

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

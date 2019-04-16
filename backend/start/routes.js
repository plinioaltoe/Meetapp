'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Create')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.get('sessions', 'SessionController.show')
  Route.resource('files', 'FileController').only(['index', 'store', 'destroy'])
  Route.resource('users', 'UserController')
    .only(['index', 'show', 'update'])
    .validator(new Map([[['users.update'], ['User/Update']]]))
  Route.resource('meetups', 'MeetupController')
    .apiOnly()
    .validator(new Map([[['meetups.store'], ['Meetup']]]))
  Route.resource('search_recommended', 'SearchRecommendedController').apiOnly()
  Route.resource('search_not_signed', 'SearchNotSignedController').apiOnly()
  Route.resource('search_signed', 'SearchSignedController').apiOnly()
  Route.resource('preferences', 'PreferenceController')
    .apiOnly()
    .validator(new Map([[['preferences.store'], ['Preference']]]))
  Route.resource('attach', 'MeetupSignupController').apiOnly()
  Route.resource('detach', 'MeetupSignoffController').apiOnly()
}).middleware(['auth'])

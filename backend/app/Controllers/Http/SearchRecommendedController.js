'use strict'

const Meetup = use('App/Models/Meetup')
const moment = use('moment')

class SearchRecommendedController {
  async index ({ request, auth }) {
    const data = request.get()
    const { user } = auth

    const preferences = []
    const userPreferences = await user.preferences().fetch()
    userPreferences.rows.map(p => preferences.push(p.id))

    const now = moment().format('YYYY-MM-DD HH:mm')

    const meetup = await Meetup.query()
      .whereRaw(` 'title' LIKE '%${data.title}%' and event_date >= '${now}'`)
      .with('file')
      .with('users')
      .with('preferences')
      .whereDoesntHave('users', builder => builder.where('users.id', user.id))
      .whereHas('preferences', builder => {
        builder.whereIn('preferences.id', preferences)
      })
      .withCount('users')
      .orderBy('event_date', 'asc')
      .fetch()

    return meetup
  }
}

module.exports = SearchRecommendedController

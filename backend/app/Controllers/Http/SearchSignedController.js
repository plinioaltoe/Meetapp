'use strict'

const Meetup = use('App/Models/Meetup')
const moment = use('moment')

class SearchSignedController {
  async index ({ request, auth }) {
    const data = request.get()
    const { user } = auth
    const now = moment().format('YYYY-MM-DD HH:mm')

    const meetup = await Meetup.query()
      .whereRaw(` 'title' LIKE '%${data.title}%' and event_date >= '${now}'`)
      .with('file')
      .with('users')
      .with('preferences')
      .whereHas('users', builder => builder.where('users.id', user.id))
      .withCount('users')
      .fetch()

    return meetup
  }
}

module.exports = SearchSignedController

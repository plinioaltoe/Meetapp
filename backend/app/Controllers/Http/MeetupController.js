'use strict'

const Database = use('Database')
const Meetup = use('App/Models/Meetup')

class MeetupController {
  async index () {
    const meetups = await Meetup.query()
      .with('file')
      .with('owner')
      .with('users')
      .with('preferences')
      .withCount('users')
      .fetch()

    return meetups
  }

  async store ({ request, auth }) {
    const data = request.only([
      'title',
      'description',
      'location',
      'file_id',
      'event_date'
    ])
    const preferences = request.input('preferences')

    const trx = await Database.beginTransaction()

    const meetup = await Meetup.create(
      {
        ...data,
        owner_id: auth.user.id
      },
      trx
    )

    await meetup.preferences().sync(preferences, trx)
    trx.commit()

    return meetup
  }

  async show ({ params }) {
    const meetup = await Meetup.findOrFail(params.id)
    await meetup.load('owner')
    await meetup.load('file')
    await meetup.load('preferences')
    await meetup.load('users')

    return meetup
  }
}

module.exports = MeetupController

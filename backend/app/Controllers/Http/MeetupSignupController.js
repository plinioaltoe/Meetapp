'use strict'
const Database = use('Database')
const Meetup = use('App/Models/Meetup')

class MeetupSignupController {
  async update ({ params, auth }) {
    const meetup = await Meetup.findOrFail(params.id)
    const { user } = auth

    const trx = await Database.beginTransaction()

    await meetup.users().attach(user.id, trx)
    await meetup.save(trx)
    await meetup.load('users', trx)

    trx.commit()
    return meetup
  }
}

module.exports = MeetupSignupController

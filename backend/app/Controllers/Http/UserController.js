'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async index ({ response }) {
    const users = await User.query()
      .with('meetups')
      .with('preferences')
      .fetch()

    return users
  }

  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    const preferences = request.input('preferences')

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)
    await user.preferences().sync(preferences, trx)

    await trx.commit()

    return response.created(user)
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['username', 'email', 'password'])
    const preferences = request.input('preferences')
    user.merge(data)

    const trx = await Database.beginTransaction()

    await user.preferences().sync(preferences, trx)
    await user.save(trx)

    await trx.commit()

    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)
    await user.load('meetups')
    await user.load('preferences')

    return user
  }
}

module.exports = UserController
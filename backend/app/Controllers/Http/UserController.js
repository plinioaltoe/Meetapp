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

    const user = await User.create(data)
    await user.preferences().attach(preferences)

    await user.load('meetups')
    await user.load('preferences')

    return response.created(user)
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['username', 'email', 'password'])
    const preferences = request.input('preferences')

    user.merge({ ...data, is_first_access: false })

    const trx = await Database.beginTransaction()

    await user.preferences().sync(preferences, trx)
    await user.save(trx)

    await trx.commit()

    await user.load('meetups')
    await user.load('preferences')

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

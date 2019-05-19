'use strict'

const User = use('App/Models/User')

class SessionController {
  async show ({ auth }) {
    const user = await auth.getUser()
    return user
  }

  async store ({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)
    let user = await User.query()
      .where('email', email)
      .with('meetups')
      .with('preferences')
      .fetch()
    token.user = user
    return token
  }
}

module.exports = SessionController

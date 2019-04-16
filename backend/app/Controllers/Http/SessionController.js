'use strict'

class SessionController {
  async show ({ auth }) {
    const user = await auth.getUser()
    return user
  }

  async store ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }
}

module.exports = SessionController

'use strict'

const Preference = use('App/Models/Preference')

class PreferenceController {
  async index () {
    const preferences = await Preference.query()
      .orderBy('id', 'asc')
      .fetch()
    return preferences
  }

  async store ({ request }) {
    const data = request.only(['subject'])
    const preference = await Preference.create(data)

    return preference
  }
}

module.exports = PreferenceController

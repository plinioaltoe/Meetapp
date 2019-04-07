'use strict'

const defaultPreferences = [
  'Front-end',
  'Back-end',
  'Mobile',
  'DevOps',
  'Gestão',
  'Marketing'
]

const Preference = use('App/Models/Preference')
const Factory = use('Factory')

const removeExistingPreferences = existing => {
  const toSave = defaultPreferences
  existing.forEach(preference =>
    toSave.splice(toSave.indexOf(preference.subject), 1)
  )
  return toSave
}

class PreferenceSeeder {
  async run () {
    const data = await Preference.query()
      .whereIn('subject', defaultPreferences)
      .fetch()

    const preferencesToSave = removeExistingPreferences(data.rows)

    await Factory.model('App/Models/Preference').createMany(
      preferencesToSave.length,
      preferencesToSave
    )
  }
}

module.exports = PreferenceSeeder

'use strict'

const Model = use('Model')

class Preference extends Model {
  static boot () {
    super.boot()
  }
  users () {
    return this.belongsToMany('App/Models/User')
      .pivotTable('user_preferences')
      .pivotModel('App/Models/UserPreference')
  }

  meetups () {
    return this.belongsToMany('App/Models/Meetup')
      .pivotTable('meetup_preferences')
      .pivotModel('App/Models/MeetupPreference')
  }
}

module.exports = Preference

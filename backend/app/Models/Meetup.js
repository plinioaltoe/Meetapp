'use strict'

const Model = use('Model')

class Meetup extends Model {
  static get dates () {
    return super.dates.concat(['event_date'])
  }

  users () {
    return this.belongsToMany('App/Models/User')
      .pivotTable('user_meetups')
      .pivotModel('App/Models/UserMeetup')
  }

  owner () {
    return this.belongsTo('App/Models/User', 'owner_id', 'id')
  }

  preferences () {
    return this.belongsToMany('App/Models/Preference')
      .pivotTable('meetup_preferences')
      .pivotModel('App/Models/MeetupPreference')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Meetup

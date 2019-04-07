'use strict'
const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  own () {
    return this.hasMany('App/Models/Meetup')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  preferences () {
    return this.belongsToMany('App/Models/Preference')
      .pivotTable('user_preferences')
      .pivotModel('App/Models/UserPreference')
  }

  meetups () {
    return this.belongsToMany('App/Models/Meetup')
      .pivotTable('user_meetups')
      .pivotModel('App/Models/UserMeetup')
  }
}

module.exports = User

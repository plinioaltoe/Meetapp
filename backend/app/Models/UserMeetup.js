'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserMeetup extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', 'UserMeetupHook.sendSignedUpMeetupEmail')
  }
}

module.exports = UserMeetup
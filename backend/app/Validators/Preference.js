'use strict'
const Antl = use('Antl')

class Preference {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      subject: 'required|unique:preferences'
    }
  }
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Preference

'use strict'
const Antl = use('Antl')

class Meetup {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required:meetups',
      description: 'required:meetups',
      location: 'required:meetups',
      event_date: 'required|date:meetups'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Meetup

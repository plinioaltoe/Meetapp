'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/MeetupSignupMail')

const User = use('App/Models/User')
const Meetup = use('App/Models/Meetup')

const UserMeetupHook = (exports = module.exports = {})

UserMeetupHook.sendSignedUpMeetupEmail = async meetupInstance => {
  console.log(meetupInstance.dirty)
  const user = await User.findOrFail(meetupInstance.dirty.user_id)
  const meetup = await Meetup.findOrFail(meetupInstance.dirty.meetup_id)

  const { email, username } = user
  const { title, description, location } = meetup
  const file = await meetup.file().fetch()

  Kue.dispatch(
    Job.key,
    { email, username, title, description, location, file },
    { attempts: 3 }
  )
}

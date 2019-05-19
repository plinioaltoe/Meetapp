'use strict'

const Mail = use('Mail')

class MeetupSignupMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'SignupMail-job'
  }

  async handle ({ email, username, title, description, location, file }) {
    console.log(`Job: ${MeetupSignupMail.key}`)
    const hasFile = !!file
    await Mail.send(
      ['emails.signin_meetup'],
      {
        username: username,
        title: title,
        description: description,
        location: location,
        url: hasFile ? file.getUrl(file.id) : '',
        hasFile
      },
      message => {
        message
          .to(email)
          .from('faleconosco@meetapp.com.br', 'Sistema de Meetups | Meetapp')
          .subject('Inscrição realizada com sucesso')
      }
    )
  }
}

module.exports = MeetupSignupMail

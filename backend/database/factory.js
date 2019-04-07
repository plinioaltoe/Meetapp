'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/Preference', (faker, i, subject) => {
  return {
    subject: subject[i]
  }
})

Factory.blueprint('App/Models/User', faker => {
  const password = faker.password()
  return {
    username: faker.username(),
    email: faker.email(),
    password
  }
})

'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

test('get list of users', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get('/users')
    .loginVia(user, 'jwt')
    .type('json')
    .end()
  response.assertStatus(200)
  response.assertJSONSubset([
    {
      username: user.username,
      email: user.email
    }
  ])
  await user.delete()
})

test('get one user', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .get(`/users/${user.id}`)
    .loginVia(user, 'jwt')
    .type('json')
    .end()
  response.assertStatus(200)
  response.assertJSONSubset([
    {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password
    }
  ])
  await user.delete()
})

test('pass wrong confirmation', async ({ client }) => {
  const { username, password, email } = await Factory.model(
    'App/Models/User'
  ).make()
  const userNoPassConfirm = {
    username,
    password,
    email,
    password_confirmation: ''
  }

  const response = await client
    .post('/users')
    .send(userNoPassConfirm)
    .end()
  response.assertStatus(400)
  response.assertError([
    {
      message: 'The password confirmation does not match.',
      field: 'password',
      validation: 'confirmed'
    }
  ])
})

test('email not found', async ({ client }) => {
  const { username, password } = await Factory.model('App/Models/User').make()
  const userWithouEmail = {
    username,
    password,
    password_confirmation: password
  }
  const response = await client
    .post('/users')
    .send(userWithouEmail)
    .end()
  response.assertStatus(400)
  response.assertError([
    {
      message: 'The email is required.',
      field: 'email',
      validation: 'required'
    }
  ])
})

test('email user fails', async ({ client }) => {
  const { username, password } = await Factory.model('App/Models/User').make()
  const userWrongEmail = {
    username,
    email: 'wrong',
    password,
    password_confirmation: password
  }

  const response = await client
    .post('/users')
    .send(userWrongEmail)
    .end()
  response.assertStatus(400)
  response.assertError([
    {
      message: 'The email should be a valid email address.',
      field: 'email',
      validation: 'email'
    }
  ])
})

test('username not found', async ({ client }) => {
  const { email, password } = await Factory.model('App/Models/User').make()
  const userNameNotFound = { email, password, password_confirmation: password }
  const response = await client
    .post('/users')
    .send(userNameNotFound)
    .end()
  response.assertStatus(400)
  response.assertError([
    {
      message: 'The username is required.',
      field: 'username',
      validation: 'required'
    }
  ])
})

test('password not found', async ({ client }) => {
  const { username, email } = await Factory.model('App/Models/User').make()
  const userPassNotFound = { username, email }
  const response = await client
    .post('/users')
    .send(userPassNotFound)
    .end()
  response.assertStatus(400)
  response.assertError([
    {
      message: 'The password is required.',
      field: 'password',
      validation: 'required'
    }
  ])
})

test('created success', async ({ client }) => {
  const user = await Factory.model('App/Models/User').make()
  user.password_confirmation = user.password
  user.preferences = []
  const response = await client
    .post('/users')
    .send(user.toJSON())
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    username: user.username,
    email: user.email
  })
  user.id = response.body.id
  await user.delete()
})

test('updated success', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  user.password_confirmation = user.password
  user.preferences = []

  const newName = 'newUserName'
  const newEmail = 'newEmail@test.com'
  user.username = newName
  user.email = newEmail

  const response = await client
    .put(`/users/${user.id}`)
    .send(user.toJSON())
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: newName,
    email: newEmail
  })

  user.id = response.body.id
  await user.delete()
})

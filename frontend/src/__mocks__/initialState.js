export const INITIAL_STATE = {
  auth: {
    data: {
      created_at: '2019-04-19 00:50:03',
      email: 'docente@ufrn.br',
      id: 12,
      is_first_access: false,
      password: '1',
      updated_at: '2019-04-19 10:07:22',
      username: 'doctor',
    },
  },
  meetup: {
    data: {
      created_at: '2019-04-20 04:59:01',
      description: 'Aqui será o novo',
      event_date: '2019-04-30 09:00:00',
      file: {},
      file_id: 6,
      id: 3,
      location: 'Brasil',
      owner: {
        id: 12,
        username: 'doctor',
        email: 'docente@ufrn.br',
        password: '1',
        is_first_access: false,
      },
      owner_id: 12,
      preferences: [],
      title: 'Novo meetup',
      updated_at: '2019-04-20 04:59:01',
      users: [],
    },
  },
  search: {
    data: {
      notSigned: {
        total: '0',
        perPage: 3,
        page: 1,
        lastPage: 0,
        data: [],
      },
      recommended: {
        total: '0',
        perPage: 3,
        page: 1,
        lastPage: 0,
        data: [],
      },
      signed: {
        total: '0',
        perPage: 3,
        page: 1,
        lastPage: 0,
        data: [],
      },
    },
  },
  user: {
    created_at: '2019-04-19 00:50:03',
    email: 'docente@ufrn.br',
    id: 12,
    is_first_access: false,
    meetups: [],
    password: '1',
    passwordConfirmation: '1',
    preferences: [1, 2, 3],
    updated_at: '2019-04-19 10:07:22',
    username: 'doctor',
  },
}

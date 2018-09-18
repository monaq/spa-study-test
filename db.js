const data = {
  users: [
    {id: 1, name: 'monica', email: 'test1@test.com', password: '0000'},
    {id: 2, name: 'hyo', email: 'test2@test.com', password: '1111'}
  ],
  logs: [

  ]
}

// query
const db = {
  findUser({ email, password }) {
    const validate = user => user.email === email && user.password === password
    return Promise.resolve().then(() => data.users.filter(validate)[0])
    // user select
  },
  findUserById(id) {
    id = id * 1
    const validate = user => user.id === id
    return Promise.resolve().then(() => data.users.filter(validate)[0])
    // user select by id
  },
  findAccessLog({ userId }) {
    console.log('logs', data.logs)
    return Promise.resolve().then(() => data.logs.filter(log => log.userId === userId))
    // accessLog filter
  },
  createAccessLog({ userId }) {
    console.log(userId)
    return Promise.resolve().then(() => data.logs.push({userId, createdAt: new Date()}))
    // push user log
  }
}

module.exports = db
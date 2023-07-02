const axios = require('axios')

class Auth0 {
  async getToken() {
    const data = {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
    }

    const token = await axios
      .post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, data, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        return res.data.access_token
      })
      .catch((err) => {
        return err
      })
    return token
  }

  async getUsers(token) {
    const users = await axios
      .get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
    return users
  }

  async getUser(token, userId) {
    const user = await axios
      .get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
    return user
  }

  async createUser(token, data) {
    const user = await axios
      .post(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, data, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
    return user
  }

  async updateUser(token, userId, data) {
    const user = await axios
      .patch(
        `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
        data,
        {
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
    return user
  }
}

exports.Auth0 = Auth0

module.exports = {
  mock: {
    baseURL: '/api/v1',
    mockURL: 'https://snow1.com'
  },
  local: {
    baseURL: '/dev-api',
    mockURL: 'https://snow2.com'
  },
  development: {
    baseURL: '/api/v1',
    mockURL: 'https://www.zkrxlink.com'
  },
  test: {
    baseURL: '/api/v1',
    mockURL: 'https://test.zkrxlink.com'
  },
  uat: {
    baseURL: '/api/v1',
    mockURL: 'https://snow3.com'
  },
  production: {
    baseURL: '/',
    mockURL: 'https://www.zkrxlink.com'
  }
}

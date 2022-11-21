module.exports = {
  servers: {
    one: {
      host: 'uhmthatsmyspot.com',
      username: 'root',
      password: 'ICS314TMSR00T'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'meteor-react-bootstrap-template',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'https://uhmthatsmyspot.com',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true,
  },
  mongo: { version: '5.0', servers: { one: {} }
  },
  proxy: {
    domains: 'uhmthatsmyspot.com',
    ssl: {
      letsEncryptEmail: 'johnson@hawaii.edu',
      forceSSL: true
    }
  },
};

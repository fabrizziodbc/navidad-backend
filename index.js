import http from 'http';
import app from './server/index.js';
import { connect } from './server/database.js';
import config from './server/config/index.js';

const { database, port } = config;

connect({
  url: database.url,
  username: database.username,
  password: database.password,
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running at ${port}`);
});

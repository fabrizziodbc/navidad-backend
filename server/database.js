import mongoose from 'mongoose';

const connect = ({ url = '', username, password }, options = {}) => {
  const encodedPassword = encodeURIComponent(password);
  const databaseName = 'wishlist';
  let dburl;
  if (username !== undefined && password !== undefined) {
    dburl = `mongodb+srv://${username}:${encodedPassword}@whislist.upn0g.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

    console.log('Connected from MongoAtlas');
  } else {
    dburl = `mongodb://${url}`;
    console.log('Connected from Local');
  }

  mongoose.connect(dburl, {
    ...options,
  });

  mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });
  mongoose.connection.on('close', () => {
    console.log('Database disconnected');
  });
  mongoose.connection.on('error', (error) => {
    console.error(`Database error: ${error}`);
  });
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database disconnected, becouse app termination');
      process.exit(0);
    });
  });
};

const disconnect = () => {
  mongoose.connection.close(() => {
    console.log('Database disconnected successfully');
  });
};

export { connect, disconnect };

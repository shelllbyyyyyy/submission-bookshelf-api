import Hapi from '@hapi/hapi';

import { BookRoute } from './routes/book.route.js';

const PORT = 9000;
const HOST = 'localhost';

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  server.route(BookRoute);

  await server.start();

  console.log('Server running on %s', server.info.uri);
};

init();

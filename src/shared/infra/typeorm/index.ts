import { createConnections } from 'typeorm';

createConnections()
  .then(() => {
    console.log('conectado SQL SERVER e MongoDb');
  })
  .catch(e => console.log(e));

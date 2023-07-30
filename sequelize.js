// sequelize.mjs

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test_new', 'postgres', 'postgres', {
  host: 'localhost', // or your database host
  dialect: 'postgres', // or the dialect for your database (e.g., 'mysql', 'sqlite', 'mssql')
  port: 5432, // default PostgreSQL port is 5432
});

export default sequelize;

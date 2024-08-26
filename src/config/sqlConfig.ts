import sql, { pool } from 'mssql';
import dotenv from 'dotenv'

dotenv.config()

export const config = {
  user: process.env.DB_USER as string, 
  password: process.env.DB_PWD as string,
  database: process.env.DB_DATABASE as string,
  server: process.env.DB_SERVER as string, 
  
  options: {
    encrypt: true, 
    trustServerCertificate: true 
  }
};

sql.connect(config).then(pool => {
  console.log('Connected to SQL Server');
}).catch(err => {
  console.error('Database connection failed:', err);
});


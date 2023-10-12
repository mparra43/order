import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: process.env.PORT,
  databases: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  
}));

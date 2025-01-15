import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: Number(process.env.DATABASE_PORT),
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  JWT: {
    ACCESS_TOKEN: {
      SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
      EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES || '7d',
    },
    REFRESH_TOKEN: {
      SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
      EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES || '30d',
    },
  },
};

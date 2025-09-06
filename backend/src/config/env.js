import dotenv from 'dotenv';

export const ENV = {
    PORT: process.env.PORT || 5001,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV
}
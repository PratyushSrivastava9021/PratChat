import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI, {
            dbName: "PratChat",
            retryWrites: true,
            ssl: true,
            tlsAllowInvalidCertificates: false
        });
        console.log('MongoDB connected successfully:', conn.connection.host);
    } catch(error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
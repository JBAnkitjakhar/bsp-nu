// sensor.ts

import mongoose, { Document, Schema } from 'mongoose';

// Define the Sensor interface
interface ISensor extends Document {
    Sensor_ID: string;
    Tagnames: string;
    weight: number;
}

// Create the Sensor schema
const sensorSchema = new mongoose.Schema({
    Sensor_ID: { type: String, required: true, unique: true },
    Tagnames: { type: String, required: true },
    weight: { type: Number,  default: 1 },
});

// Create and export the Sensor model
export const Sensor = mongoose.models.Sensor || mongoose.model('Sensor', sensorSchema);
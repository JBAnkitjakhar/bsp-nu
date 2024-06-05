

import mongoose, { Document, Schema } from 'mongoose';




// Create the Region schema
const regionSchema = new mongoose.Schema({
    regionName: { type: String, required: true ,unique:true},
    Sensor_IDs:[
        { type: String, ref: 'Sensor' }, 
    ],
    workingStatuses: [
        { type: Boolean, required: true },
        
    ],
});

// Create and export the Region model
// const Region = mongoose.models.Region || mongoose.model('Region', regionSchema);
// export default Region
export const Region =  mongoose.models.Region ||  mongoose.model('Region', regionSchema);

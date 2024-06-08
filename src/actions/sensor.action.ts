"use server"

import { ISensor } from "@/lib/interfaces/sensor";
import { Region } from "@/lib/models/region.model";
import { Sensor } from "@/lib/models/sensor.model";
import connectToDB from "@/lib/mongoose"
import { AnyAaaaRecord } from "dns";
import Optional from 'mongoose';
const mongoose = require('mongoose'); // Assuming you have Mongoose installed

interface SensorData {
  Sensor_ID: string;
  Tagnames: string;
  weight: number;
}

export const addSensorsToDatabase = async (sensorData: SensorData[]) => {
  try {
    // Connect to your MongoDB database
    // let data=JSON.stringify(sensorData)
    await connectToDB();
    // Loop through each sensor object in the data
    // data=JSON.parse(data);

    for (const sensor of sensorData) {
      // Extract sensor information
      const sensorId = `[${sensor.Sensor_ID}]` // Remove leading and trailing brackets
      const tagnames = sensor.Tagnames;
      const weight = 1; // Assuming weight is always 1, adjust if needed

      // Create a new Sensor document
      // console.log(sensor);mongo

      const newSensor = new Sensor({
        Sensor_ID: sensorId,
        Tagnames: tagnames,
        weight: weight
      });

      try {
        // Attempt to save the sensor, handle potential duplicate key errors
        await newSensor.save();
        console.log(`Added sensor: ${sensorId}`);
      } catch (error: any) {
        if (error.code === 11000) { // Duplicate key error (unique constraint)
          console.warn(`Sensor with ID: ${sensorId} already exists, skipping...`);
        } else {
          throw error; // Re-throw other errors
        }
      }

    }

    console.log('All sensors added successfully (or skipped if duplicates)!');

  } catch (error) {
    console.error(error);
  }
}
// use for initial setup of sensor.regions array
export const addsensorregions = async (sensorData: { [region: string]: string[] }) => {
  try {
    // Connect to your MongoDB database
    await connectToDB();
    // Loop through each sensor object in the data
    const data = getSensorRegions(sensorData)
    console.log(data);
    // for(const Sensor_ID in data){
    //   const regions=data[Sensor_ID]
    //   console.log(Sensor_ID,"clg",regions);

    // }

    for (const Sensor_ID in data) {
      const regions = data[Sensor_ID]
      try {
        const sensor = await Sensor.findOne({ Sensor_ID })
        sensor.regions = regions
        await sensor.save()
        console.log(sensor);

      } catch (error) {
        console.log(error);

      }


    }
    console.log('All sensors region added successfully');

  } catch (error) {
    console.error(error);
  }
}

//get sensor region

interface SensorRegionMap {
  [sensorId: string]: { [regionName: string]: { workingStatuse: boolean } };
}

function getSensorRegions(sensorData: { [region: string]: string[] }): SensorRegionMap {
  const sensorRegions: SensorRegionMap = {};

  // Loop through each region and its sensor list
  for (const region in sensorData) {
    const sensors = sensorData[region];

    // Loop through each sensor in the region
    for (const sensor of sensors) {
      // Remove square brackets from sensor IDs (assuming they are valid sensor IDs)
      const sensorId = sensor; // Remove leading and trailing brackets

      // Add the region to the sensor's region map with workingStatuses set to true
      sensorRegions[sensorId] = sensorRegions[sensorId] || {}; // Initialize if not present
      sensorRegions[sensorId][region] = { workingStatuse: true };
    }
  }

  return sensorRegions;
}

//get sensor data
export const getSensorData = async (sensorId: string): Promise<string | null> => {
  try {
    await connectToDB(); // Assuming you have a separate function to connect to the database

    const sensor: ISensor | null = await Sensor.findOne({ Sensor_ID: sensorId });

    if (!sensor) {
      console.log(`Sensor with ID '${sensorId}' not found.`);
      return null; // Explicitly return null for clarity
    }

    return JSON.stringify(sensor);
  } catch (error) {
    console.error('Error retrieving sensor data:', error);
    throw error; // Re-throw the error for better handling in the calling code
  }
}
interface SensorRegion {
  [regionName: string]: {
    workingStatuse: boolean;
    // Add other properties as needed
  };
}
//add sensor to regions
export const addSensorToRegions = async (Tagnames: string, regions: SensorRegion) => {
  try {
    await connectToDB();
    const sensor = await Sensor.findOne({ Tagnames });
    if (!sensor) {
      throw new Error(`Sensor not found: ${Tagnames}`)
    }
    sensor.regions=regions;
    

    await sensor.save();
    console.log(sensor);
    return{
      message:"Sensor added to regions successfully"
    }

  } catch (error) {
    console.log(error);
    return{
      message:"Failed to add sensor to regions"
    }

    }
    }
    
    //delete sensor form regions
      
export const deleteSensorFromRegions = async (Tagnames: string, regions: SensorRegion) => {
  try {
    await connectToDB();
    console.log(regions);
    
    const sensor = await Sensor.findOne({ Tagnames });
    if (!sensor) {
      throw new Error(`Sensor not found: ${Tagnames}`)
    }
    // const regions = sensor["regions"];
    // for (const region of regionNames) {
    //   regions[region] = { workingStatuse: false };
    // }
    sensor.regions=regions;
    await sensor.save();
    console.log(sensor);
    return {
      message: "Sensor deleted from regions successfully",
    }


  } catch (error) {
    console.log(error);
    return{
      message: "Error deleting sensor from regions",
    }

  }
}

//modify weigh of sensors
export interface SensorWeights {
  [sensorId: string]: { weight: number };
}
export const modifyWeightOfSensors = async (sensorWeights: SensorWeights) => {
  try {
    await connectToDB();
    for (const [sensorId, { weight }] of Object.entries(sensorWeights)) {
      console.log(`Sensor ID: ${sensorId}, Weight: ${weight}`);
      try {
        await connectToDB(); // Ensure database connection is established

        const sensor = await Sensor.findOneAndUpdate(
          { Sensor_ID: sensorId }, // Filter to find sensor by ID
          { $set: { weight } }, // Update weight using $set operator
          { new: true } // Return the updated document
        );

        if (!sensor) {
          console.warn(`Sensor with ID: ${sensorId} not found for update.`);
        } else {
          console.log(`Updated sensor weight for: ${sensorId}`, sensor);
        }
      } catch (error) {
        console.error('Error updating sensor weight:', error);
      }
    }



  } catch (error) {
    console.error('Error updating sensor weights:', error);
  }
}

//download json file
export const downloadJsonfile=async ()=>{
  try {
    await connectToDB()
    const sensors =  await Sensor.find({ regions: { $exists: true, $ne: [] } }, { Sensor_ID: 1, weight: 1,_id:0 ,Tagnames:1});
    interface SensorData {
      ["sensor"]: string;
      "weight": number;
    }
    const sensorObject =[]
  for (const sensor of sensors) {
    sensorObject.push({
      ["sensor"]: `${sensor.Sensor_ID}_${sensor.Tagnames}`,
      ["weight"]: sensor.weight
    }) 
    console.log({
      ["sensor"]: `${sensor.Sensor_ID}_${sensor.Tagnames}`,
      ["weight"]: sensor.weight
    });
    
  }

  const jsonData = JSON.stringify(sensorObject, null, 2); // Optionally add indentation
  return {
    data: jsonData, // Return the stringified JSON data
    message: 'Sensor data download initiated.', // Inform user about download
  };
  
  } catch (error) {
    console.log(error);
    
  }
}

export const downloadRegionwisePicklefile=async()=>{
  try {
    await connectToDB();
    const sensors =  await Sensor.find({ regions: { $exists: true, $ne: [] } }, { Sensor_ID: 1, regions: 1,_id:0 });
    interface piclefileinterface {
      [regionName: string]: string[]; // Maps region names (strings) to arrays of sensor IDs (strings)
    }
    // console.log(JSON.stringify(sensors));
    const regionMap: Record<string, string[]> = {};

    for (const sensor of sensors) {
      for (const regionName in sensor.regions) {
        if (sensor.regions[regionName].workingStatuse) { // Check workingStatuse
          const sensorId = sensor.Sensor_ID;
          regionMap[regionName] = regionMap[regionName] || []; // Initialize if not present
          regionMap[regionName].push(sensorId);
        }
      }
    }
  console.log(regionMap);
  const jsonData = JSON.stringify(regionMap, null, 2); // Optionally add indentation
  return {
    data: jsonData, // Return the stringified JSON data
    message: 'Sensor data download initiated.', // Inform user about download
  };
  

    
  //   const picklefileobject: piclefileinterface = {};
  //   // let i=0;
  // for (const sensor of sensors) {
  //   // i++;
  //   for(const region in sensor["regions"]){

  //     // sensorObject[re]

  //     // picklefileobject[region].push(sensor[Sensor_ID]);

  //     // console.log(region);
      
  //   }
    
  //   // sensorObject[sensor.Sensor_ID] = { weight: sensor.weight };
  // }


  // return sensorObject;
  // for (const sensorId in sensorObject) {
  //   const sensorWeight = sensorObject[sensorId].weight;
  //   console.log(`Sensor ID: ${sensorId}, Weight: ${sensorWeight}`);
  // }
    
    // console.log(picklefileobject);
    
  // return JSON.stringify(sensorObject);
  } catch (error) {
    console.log(error);
    
  }
}

export const getallsensors=async()=>{
  try {
    await connectToDB()
    const sensors=await Sensor.find({},{Tagnames:1,_id:0});
    // console.log(sensors);
    return JSON.stringify(sensors);
  } catch (error) {
    console.log(error);
    
  }
  
}
export const getasensor=async(Tagnames:string)=>{
  try {
    await connectToDB()
    console.log("get a sensor called",Tagnames);
    
   const sensor=await Sensor.findOne({Tagnames});
   console.log(sensor);
   return JSON.stringify(sensor);
   
   
  } catch (error) {
    console.log(error);
    
  }
  
}




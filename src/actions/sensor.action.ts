"use server"

import { auth } from "@/auth";
import { ISensor } from "@/lib/interfaces/sensor";
import { logger } from "@/lib/logger";
import { Region } from "@/lib/models/region.model";
import { Sensor } from "@/lib/models/sensor.model";
import { SensorRegionWeight } from "@/lib/models/sensorRegionWeight.model";
import connectToDB from "@/lib/mongoose"
import { AnyAaaaRecord } from "dns";
import Optional from 'mongoose';
const mongoose = require('mongoose'); // Assuming you have Mongoose installed
//load all sensor
//for geting all sensors 
export const loadSensors = async () => {
  try {

    await connectToDB();
    const sensorList = await Sensor.find({}, {
      __v: 0, _id: 0
    }).exec();
    console.log('Sensors loaded:', sensorList);
    return JSON.stringify(sensorList)
  } catch (error) {
    console.log(error);
    return [];

  }
};
interface SensorData {
  Sensor_ID: string;
  Tagnames: string;
  weight: number;
}
//inital adding sensors to database 
export const addSensorsToDatabase = async (sensorData: SensorData[]) => {
  try {
    await connectToDB();
    console.log(sensorData);
    for (const sensor of sensorData) {
      // Extract sensor information
      const sensorId = `[${sensor.Sensor_ID}]` // Remove leading and trailing brackets
      const tagnames = sensor.Tagnames;
      const newSensor = new Sensor({
        Sensor_ID: sensorId,
        Tagname: tagnames,

      });

      try {
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
export const addsensortoregions = async (sensorData: { [region: string]: string[] }) => {
  try {
    await connectToDB();
    console.log(sensorData);
    for (const region in sensorData) {
      const sensors = sensorData[region];
      for (const sensor of sensors) {
        const sensorRegionWeight = new SensorRegionWeight({
          Sensor_ID: sensor,
          regionName: region
        })
        try {
          await sensorRegionWeight.save();
          console.log(`${sensor} added to region: ${region} successfully`);

        } catch (error) {
          console.log(error);
        }
      }
    }
    console.log('All sensors aded to  regions  successfully');
  } catch (error) {
    console.error(error);
  }
}
//add sensor to regions
interface Iselectedregions {
  [_id: string]: {
    workingStatus: boolean
    regionName?: string,
  }
}
export const addSensorToRegions = async (selectedregions: Iselectedregions) => {
  try {

    await connectToDB();
    // console.log(selectedregions);
    const session = await auth();
    const user = session?.user;
    // console.log(user);

    for (const _id in selectedregions) {
      if (selectedregions[_id].workingStatus) {
        try {
          const data = await SensorRegionWeight.findOneAndUpdate(
            { _id: _id }, // Filter to find sensor by ID
            { $set: { workingStatus: true } }, // Update weight using $set operator
            { new: true } // Return the updated document
          );
          if (!data) {
            // console.warn(`Sensor with Tagnames: ${Tagnames} not found for update.`);
            logger.warn(`SensorRegionWeight id: ${_id} not found for update workingstatus.`)
          } else {
            logger.info(`Updated workingstatus changed true for ${data.Sensor_ID} in region: ${data.regionName} by ${user?.email}`);

          }
        } catch (error) {
          console.log(error);

        }
      }


    }

    // logger.info(`Add regions to this ${sensor.Tagnames} sensor successfuly`)

    return {
      message: "Sensor added to regions successfully"
    }

  } catch (error) {
    console.log(error);
    return {
      message: "Failed to add sensor to regions"
    }

  }
}


//delete sensor form regions

export const deleteSensorFromRegions = async (selectedregions: Iselectedregions) => {
  try {

    await connectToDB();
    // console.log(selectedregions);
    const session = await auth();
    const user = session?.user;
    // console.log(user);

    for (const _id in selectedregions) {
      if (!selectedregions[_id].workingStatus) {
        try {
          const data = await SensorRegionWeight.findOneAndUpdate(
            { _id: _id }, // Filter to find sensor by ID
            { $set: { workingStatus: false } }, // Update weight using $set operator
            { new: true } // Return the updated document
          );
          if (!data) {
            // console.warn(`Sensor with Tagnames: ${Tagnames} not found for update.`);
            logger.warn(`SensorRegionWeight id: ${_id} not found for update workingstatus.`)
          } else {
            logger.info(`Updated workingstatus changed to false for ${data.Sensor_ID} in region: ${data.regionName} by ${user?.email}`);

          }
        } catch (error) {
          console.log(error);

        }
      }


    }

    // logger.info(`Add regions to this ${sensor.Tagnames} sensor successfuly`)

    return {
      message: "Sensor Removed from regions successfully"
    }

  } catch (error) {
    console.log(error);
    return {
      message: "Failed to add sensor to regions"
    }

  }
}

//modify weigh of sensors
export interface SensorWeights {
  [_id: string]: { weight: number };
}
export const modifyWeightOfSensors = async (sensorWeights: SensorWeights) => {
  try {
    await connectToDB(); // Connect to database

    for (const [_id, { weight }] of Object.entries(sensorWeights)) {
      // console.log(`Sensor ID: ${Tagnames}, Weight: ${weight}`);
      try {
        await connectToDB(); // Ensure database connection is established

        const sensor = await SensorRegionWeight.findOneAndUpdate(
          { _id: _id }, // Filter to find sensor by ID
          { $set: { weight } }, // Update weight using $set operator
          { new: true } // Return the updated document
        );

        if (!sensor) {
          // console.warn(`Sensor with Tagnames: ${Tagnames} not found for update.`);
          logger.warn(`Sensor with Tagnames: ${_id} not found for update.`)
        } else {
          logger.info(`Updated sensor weight for: ${_id} :${weight}`);

        }
      } catch (error) {
        logger.error('Error updating sensor weight:', error);
        // Handle individual sensor update errors (optional)
      }
    }

    return {
      message: "Sensor weights updated successfully",
    };
  } catch (error) {
    console.error('Error updating sensor weights:', error);
    return {
      message: "Error updating sensor weights",
    };
  }
};

//new sensor ading
interface SensorEntry {
  
  regionName: string;
  weight: number;
}
interface Iaddsensor{
  Sensor_ID:string
  Tagname:string
  entries:SensorEntry[]
}
export const addnewsensor=async(data:Iaddsensor)=>{
  try {
    await connectToDB();
    const sensor=new Sensor({
      Sensor_ID:data.Sensor_ID,
      Tagname:data.Tagname
    })
    await sensor.save();
    if(!sensor){
      return {
        message:"signal  already present"
      }
    }
    for(const entrie of data.entries){
      const sensorregion=new SensorRegionWeight({
        Sensor_ID:data.Sensor_ID,
        weight:entrie.weight,
        regionName:entrie.regionName

      });
      try {
        await sensorregion.save();
        logger.info(`${data.Sensor_ID} added to region: ${entrie.regionName} successfully`)
      } catch (error) {
        logger.error(`${data.Sensor_ID} added to region: ${entrie.regionName}  was unable to add `)
      }
    }
    return{
      message:"sensor and its regions add successfuly"
    }
  } catch (error) {
    console.log(error);
    return{
      message:"somthing went wrong on server"
    }
    
  }
}


//download json file
export const downloadJsonfile = async () => {
  try {
    await connectToDB()
    const sensors = await Sensor.find({ regions: { $exists: true, $ne: [] } }, { Sensor_ID: 1, weight: 1, _id: 0, Tagnames: 1 });
    interface SensorData {
      ["sensor"]: string;
      "weight": number;
    }
    const sensorObject = []
    for (const sensor of sensors) {
      sensorObject.push({
        ["sensor"]: `${sensor.Sensor_ID}_${sensor.Tagnames}`,
        ["weight"]: sensor.weight
      })
      // console.log({
      //   ["sensor"]: `${sensor.Sensor_ID}_${sensor.Tagnames}`,
      //   ["weight"]: sensor.weight
      // });

    }

    const jsonData = JSON.stringify(sensorObject, null, 2); // Optionally add indentation
    logger.info(`download json file request successfully`)
    return {
      data: jsonData, // Return the stringified JSON data
      message: 'Sensor data download initiated.', // Inform user about download
    };

  } catch (error) {
    console.log(error);

  }
}

export const downloadRegionwisePicklefile = async () => {
  try {
    await connectToDB();
    const sensors = await Sensor.find({ regions: { $exists: true, $ne: [] } }, { Sensor_ID: 1, regions: 1, _id: 0 });
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
    logger.info(`download regionwisepickle file request successfully`)

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
    logger.error(error);

  }
}







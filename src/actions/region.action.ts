// import { Region } from "@/lib/models/region.model";
// import Region from "@/lib/models/region.model";
"use server"
import { Region } from "@/lib/models/region.model";
import { Sensor } from "@/lib/models/sensor.model";
// import Region from "@/lib/models/region";
import connectToDB from "@/lib/mongoose";





// Assuming you have a region ID (e.g., 'your-region-id')
const regionId = 'your-region-id';

// Find the region by ID and populate the 'sensorIds' field
export const findsensorbyRegion = async () => {
  try {
    await connectToDB(); // Assuming you have a separate function to connect

    const regionName = "CVR_L2";

    // Perform a lookup to join sensor and region data with filtering
    const sensorsWithStatus = await Region.aggregate([
      {
        $match: { regionName }, // Filter by region name
      },
      {
        $lookup: {
          from: 'sensors',
          localField: 'Sensor_IDs', // Array of sensor IDs in the region
          foreignField: 'Sensor_ID', // Assuming '_id' is the sensor ID field in the Sensor collection
          as: 'sensorData',
        },
      },
      {
        $unwind: '$sensorData', // Unwind the 'sensorData' array for each sensor ID
      },
      // {
      //   $match: { // Filter matched sensors based on working status (optional)
      //     'sensorData.workingStatus': true, // Change the comparison value as needed (true/false)
      //   },
      // },
      {
        $project: {
          sensorId: '$sensorData.Sensor_ID', // Sensor ID from the sensor document
          sensorName: '$sensorData.Tagnames',
          weight: '$sensorData.weight',
          workingStatus: {
            $arrayElemAt: ['$workingStatuses', { $indexOfArray: ['$Sensor_IDs', '$sensorData.Sensor_ID'] }],
          },
        },
      },
    ]);

    if (sensorsWithStatus.length === 0) {
      console.log(`No sensors found for region: ${regionName}`);
    } else {
      console.log(sensorsWithStatus);
    }
  } catch (error) {
    console.error(error);
  }
};



export const addRegionsToDatabase = async (data: any) => {
  try {
    // Connect to your MongoDB database
    await connectToDB();

    // Loop through each region in the data
    for (const regionName in data) {
      const Sensor_IDs = data[regionName]
      // console.log(Sensor_IDs);

      // Create a new Region document with sensor IDs and working statuses set to all true (modify as needed)
      const newRegion = new Region({
        regionName,
        Sensor_IDs,
        workingStatuses: Array(Sensor_IDs.length).fill(true), // Assuming all sensors are working initially (adjust)
      });

      //   Save the new region to the database
      await newRegion.save();

      console.log(`Added region: ${newRegion}`);
    }

    console.log('All regions added successfully!');

  } catch (error) {
    console.error(error);
  }
}

export const getRegionsForSensorId = async () => {
  try {
    // Use aggregation pipeline for efficient lookup
    const sensorId = "[9.226]"
    const pipeline = [
      {
        $match: {
          Sensor_IDs: sensorId, // Convert ID directly to ObjectId
        },
      },
      {
        $project: {
          regionName: 1,
          _id: 0, // Exclude _id if not required
        },
      },
    ];

    const regions = await Region.aggregate(pipeline);
    console.log(regions);

    return regions.map((region) => region.regionName); // Extract region names
  } catch (error) {
    console.error(error);
    return []; // Return empty array on error
  }
}

export const getRegiondata = async (regionName: string) => {
  try {
    await connectToDB();
    const region = await Region.findOne({ regionName });
    if (!region) {
      throw new Error(`Region not found: ${regionName}`)
    }
    return region;
  } catch (error) {
    console.error(error);
    return null;

  }
}

export const getRegionsensors = async (regionName: string) => {
  try {
    await connectToDB();
    const region = await Region.findOne({ regionName });
    if (!region) {
      throw new Error(`Region not found: ${regionName}`);

    }
    const Sensor_IDs = region["Sensor_IDs"];
    console.log("total region sensors ", Sensor_IDs.length);


    const sensors = await Sensor.find({
      Sensor_ID: { $in: Sensor_IDs }
    }, { Tagnames: 1 })
    // .then((sensors) => {
    //   console.log('Retrieved sensor data:', sensors.length);
    // })
    // .catch(error => {
    //   console.error('Error retrieving sensor data:', error);
    // });
    return JSON.stringify(sensors);

    // for(const Sensor_IDs in)


  } catch (error) {
    console.log(error);

  }
}
export const getallregions = async () => {
  try {
    await connectToDB();
    const regions = await Region.find({}, { regionName: 1, _id: 0 });
    console.log(regions);
    return JSON.stringify(regions)


  } catch (error) {
    console.log(error);
    return null


  }
}









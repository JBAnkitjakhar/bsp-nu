// import { Region } from "@/lib/models/region.model";
// import Region from "@/lib/models/region.model";
"use server"
import { Region } from "@/lib/models/region.model";
// import Region from "@/lib/models/region";
import connectToDB from "@/lib/mongoose";

export const Addregion=async()=>{
    try {
        await connectToDB();
        // const sensor=await Sensor.create({
        //     "Sensor_ID": "[9.226]",
        //     "Tagnames": "Ghost Rolling",
        //   });
        console.log("CVR_L2");
        
        const region = new Region({
            regionName: "CVR_L2",
            Sensor_IDs:[
                "[9.226]",
                "[12:44]",
                "[5:27]",
                
              ],
              workingStatuses:[
                true,
                false,
                true,
              ]
            

        })
          await region.save()
          console.log(region);
          
    } catch (error) {
        console.log(error);
        
    }
}



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
              $arrayElemAt: ['$workingStatuses', {  $indexOfArray: ['$Sensor_IDs', '$sensorData.Sensor_ID']  }],
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
  


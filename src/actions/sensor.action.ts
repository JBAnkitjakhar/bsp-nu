"use server"

import { Sensor } from "@/lib/models/sensor.model";
import connectToDB from "@/lib/mongoose"

export const Addsensor=async()=>{
    try {
        await connectToDB();
        // const sensor=await Sensor.create({
        //     "Sensor_ID": "[9.226]",
        //     "Tagnames": "Ghost Rolling",
        //   });
        const sensor = new Sensor({
            "Sensor_ID": "[1:5]",
    "Tagnames": "L1_DCVR_WORK_DB.DriveIn.TorqueFeedback",
        })
          await sensor.save()
          console.log(sensor);
          
    } catch (error) {
        console.log(error);
        
    }
}
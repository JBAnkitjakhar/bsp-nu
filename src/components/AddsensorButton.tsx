"use client"
import React from 'react'
import { Button } from './ui/button'
import { SensorWeights, addSensorToRegions, deleteSensorFromRegions, downloadJsonfile, downloadRegionwisePicklefile, getSensorData, modifyWeightOfSensors } from '@/actions/sensor.action'
import { addRegionsToDatabase, findsensorbyRegion, getRegionsForSensorId, getRegionsensors } from '@/actions/region.action'

const AddsensorButton = () => {
  return (
    <div>
        
        <Button onClick={async()=>{
            console.log("getRegionsensors button clicked")
            await getRegionsensors("CVAH_L1")
        }}>getRegionsensors</Button>
        <Button onClick={async()=>{
            console.log("downloadJsonfile button clicked")
            await downloadJsonfile().then((data)=>{
              if(data){
                const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jsonfile.json';
        a.click();
              }
            })

        }}>downloadJsonfile</Button>
        <Button onClick={async()=>{
            console.log("downloadRegionwisePicklefile button clicked")
            await downloadRegionwisePicklefile();
        }}>downloadRegionwisePicklefile</Button>
        <Button onClick={async()=>{
            console.log("addSensorToRegions button clicked")
            const arr=["CVR_L1","CVR_L2","FURNACE EXIT"]
            await addSensorToRegions("[12:44]",arr)
        }}>addSensorToRegions</Button>
        <Button onClick={async()=>{
            console.log("modifyWeightOfSensors button clicked")
            // const arr=["CVR_L1","CVR_L2"]
            const sensorWeights:SensorWeights={
              "12:44":{
                weight: 4.5 
              },
              "[9.226]":{
                weight: 4.5 
              }
            }

            await modifyWeightOfSensors(sensorWeights)
        }}>modifyWeightOfSensors</Button>
         <Button onClick={async()=>{
            console.log("deleteSensorFromRegions button clicked")
            const arr=["CVR_L1","CVR_L2"]
            await deleteSensorFromRegions("[12:44]",arr)
        }}>deleteSensorFromRegions</Button>
        <Button onClick={async()=>{
            console.log("getSensorData button clicked")
            // await addRegionsToDatabase()
            // await Addregion()
            await getSensorData("[9.226]").then((data)=>{
              if(data){

                console.log(JSON.parse(data))
              }
            }).catch((error)=>{
              console.log(error)
            })
        }}>getSensorData</Button>
        {/* <Button onClick={async()=>{
            console.log("get region button clicked")
            await findsensorbyRegion()
        }}>get region</Button> */}

    </div>
  )
}

export default AddsensorButton
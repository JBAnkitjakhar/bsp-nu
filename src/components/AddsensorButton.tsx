"use client"
import React from 'react'
import { Button } from './ui/button'
import { Addsensor } from '@/actions/sensor.action'
import { Addregion, findsensorbyRegion } from '@/actions/region.action'

const AddsensorButton = () => {
  return (
    <div>

        <Button onClick={async()=>{
            console.log("Add sensor button clicked")
            await Addsensor()
        }}>add sensor</Button>
        <Button onClick={async()=>{
            console.log("Add region button clicked")
            await Addregion()
        }}>add region</Button>
        <Button onClick={async()=>{
            console.log("get region button clicked")
            await findsensorbyRegion()
        }}>get region</Button>

    </div>
  )
}

export default AddsensorButton
import AddsensorButton from '@/components/AddsensorButton'
import ExcelToJsonComponent from '@/components/ExcelToJsonComponent'
import { PickleToJsonConverter } from '@/components/PickleToJsonConverter'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* <h1 classname="bg-blue" >dsdsds</h1> */}
      {/* <h1>experimental </h1> */}
      <h1>this is new</h1>
      <h2>dsdsdd</h2>
        <AddsensorButton/>
        <PickleToJsonConverter/>
        <ExcelToJsonComponent/>
    </div>
  )
}

export default page
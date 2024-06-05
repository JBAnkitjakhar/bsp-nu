import AddsensorButton from '@/components/AddsensorButton'
import ExcelToJsonComponent from '@/components/ExcelToJsonComponent'
import { PickleToJsonConverter } from '@/components/PickleToJsonConverter'
import React from 'react'

const page = () => {
  return (
    <div>
        <AddsensorButton/>
        <PickleToJsonConverter/>
        <ExcelToJsonComponent/>
    </div>
  )
}

export default page
"use client"
import { downloadJsonfile, downloadRegionwisePicklefile } from '@/actions/sensor.action'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center'>
         <Button onClick={async () => {
        console.log("downloadJsonfile button clicked")

        await downloadJsonfile().then((data) => {
          if (data) {
            // const jsondata = JSON.parse(data.data)

            const blob = new Blob([data.data], { type: 'application/json' });
            const downloadUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = 'data.json';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

          }
        })

      }}>Download Json.file</Button>
      <Button onClick={async () => {
        console.log("downloadRegionwisePicklefile button clicked")
        await downloadRegionwisePicklefile().then((data)=>{
          if (data) {
            // const jsondata = JSON.parse(data.data)

            const blob = new Blob([data.data], { type: 'application/json' });
            const downloadUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = 'regionwise_columns.json';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

          }
        })
      }}>Download Regionwise Pickle.file</Button>
    </div>
  )
}

export default page
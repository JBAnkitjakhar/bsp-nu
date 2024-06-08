"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getRegionsensors, getallregions } from "@/actions/region.action"
import { addSensorToRegions, deleteSensorFromRegions, getallsensors, getasensor } from "@/actions/sensor.action"
import { regionsname, sensorsTagnames } from "@/constants"

import { useToast } from '@/components/ui/use-toast'



const ComboboxDemo = () => {
    interface SensorRegion {
        [regionName: string]: {
          workingStatuse: boolean;
          // Add other properties as needed
        };
      }
      const {toast}=useToast()
    const [open, setOpen] = React.useState(false)
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [value1, setValue1] = React.useState("")
    const [value2, setValue2] = React.useState("")
    interface regionsensors {
        _id: string;
        Tagnames: string;
      }
      
    const [regionsensors, setRegionsensors] = React.useState<regionsensors[]>([]);
    interface ISensor {
      _id: string;
      Sensor_ID: string;
      Tagnames: string;
      weight: number;
      regions: SensorRegion; // Reference the SensorRegion interface
      __v: number;
    }
  const [sensor, setSensor] = React.useState<ISensor>();
    const [sensorregions,setsensorregions]=React.useState<SensorRegion>({});
    const [selsectedregions,setselsectedregions]=React.useState<SensorRegion>({});

    const sensors = sensorsTagnames
    const regions = regionsname

  
    React.useEffect(() => {
        // console.log(regionsensors);
        const fun = async () => {
            await getRegionsensors(value).then((res) => {
                // console.log(res);
                if (res) {
                    const data = JSON.parse(res);
                    console.log(data);
                    


                    setRegionsensors(data)
                }

            });

        }
        fun()
    }, [value])
 
    React.useEffect(() => {
         const fun = async () => {
            
            await getasensor(value2).then((res) => {
                console.log(res);
                if(res){
                    const data=JSON.parse(res);
                    console.log(data);
                    // setSensor(data)
                    setsensorregions(data?.regions);
                    setselsectedregions({});
                }
                

            });

        }
        fun()
    }, [value2])
    React.useEffect(() => {
        // console.log(regionsensors);
        const fun = async () => {
            
            await getasensor(value1).then((res) => {
                console.log(res);
                if(res){
                    const data=JSON.parse(res);
                    console.log(data);
                    setSensor(data)
                    setsensorregions(data?.regions);
                    setselsectedregions({});

                }
                

            });

        }
        fun()
    }, [value1])
  
    

    return (
        <div>
            <div className="flex flex-row">
                <div>

                    <h1>select by region</h1>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? regions.find((region) => region.regionName === value)?.regionName
                                    : "Select Region..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search framework..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {regions.map((region) => (
                                            <CommandItem
                                                key={region.regionName}
                                                value={region.regionName}
                                                onSelect={async (currentValue) => {
                                                   
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setOpen(false)
                                                }}
                                            >
                                                {region.regionName}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value === region.regionName ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {(regionsensors.length>0 )&&
                    <div>

                        <h1>select sensor from region</h1>
                        <Popover open={open2} onOpenChange={setOpen2}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open2}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? regionsensors.find((sensor) => sensor.Tagnames === value2)?.Tagnames
                                    : "Select Region..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search framework..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {regionsensors.map((sensor,index) => (
                                            <CommandItem
                                                key={index}
                                                value={sensor.Tagnames}
                                                onSelect={async (currentValue) => {
                                                    // hendleSelectregion();
                                                    setValue2(currentValue === value2 ? "" : currentValue)
                                                    setOpen2(false)
                                                }}
                                            >
                                                {sensor.Tagnames}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value === sensor.Tagnames ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                        
                    </div>


                }
            </div>
            <h1>select by sensor Tagname</h1>
            <Popover open={open1} onOpenChange={setOpen1}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open1}
                        className="w-[200px] justify-between"
                    >
                        {value1
                            ? sensors.find((sensor) => sensor.Tagnames === value1)?.Tagnames
                            : "Select sensor..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {sensors.map((sensor, index) => (
                                    <CommandItem
                                        key={index}
                                        value={sensor.Tagnames}
                                        onSelect={(currentValue) => {
                                            setValue1(currentValue === value1 ? "" : currentValue)
                                            setOpen1(false)
                                        }}
                                    >
                                        {sensor.Tagnames}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === sensor.Tagnames ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div>
                <h1>selected list</h1>
            <table className="table-auto w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium">
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Region Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {selsectedregions && // Check if regions exist before accessing
                Object.entries(selsectedregions).map(([regionName],index) => (
                    selsectedregions[`${regionName}`].workingStatuse&&<tr key={regionName} className="border-b border-gray-300">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{regionName}</td>
                    <td className="px-4 py-2">
                      <Button onClick={()=>{
                        console.log(regionName);
                        setsensorregions((prevSensorRegions) => {
                            const updatedSensorRegions = { ...prevSensorRegions };
                            if (updatedSensorRegions[regionName]) {
                              updatedSensorRegions[regionName].workingStatuse = false;
                            }
                            return updatedSensorRegions;
                          });
                          setselsectedregions((prevSelectedRegions) => ({
                            ...prevSelectedRegions,
                            [regionName]: {"workingStatuse":false}, // Copy region data from sensorRegions
                          }));

                      }}>Remove from list</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h1>select the regions</h1>
            <table className="table-auto w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium">
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Region Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {sensorregions && // Check if regions exist before accessing
                Object.entries(sensorregions).map(([regionName],index) => (
                    !sensorregions[`${regionName}`].workingStatuse&&<tr key={regionName} className="border-b border-gray-300">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{regionName}</td>
                    <td className="px-4 py-2">
                      <Button onClick={()=>{
                        console.log(regionName);
                        setsensorregions((prevSensorRegions) => {
                            const updatedSensorRegions = { ...prevSensorRegions };
                            if (updatedSensorRegions[regionName]) {
                              updatedSensorRegions[regionName].workingStatuse = true;
                            }
                            return updatedSensorRegions;
                          });
                          setselsectedregions((prevSelectedRegions) => ({
                            ...prevSelectedRegions,
                            [regionName]: sensorregions[regionName], // Copy region data from sensorRegions
                          }));
                      }}>Add to region</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
            </div>
            <Button onClick={async()=>{
              if(sensor){

                await addSensorToRegions(sensor.Tagnames,sensorregions).then((res)=>{
                    console.log(res);
                    toast({
                        description: res.message,
                        
                      });
                      setselsectedregions({});
                })
              }
            }}>Apply changes</Button>
            


        </div>
    )
}
export default ComboboxDemo
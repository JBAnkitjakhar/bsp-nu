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
import { deleteSensorFromRegions, getallsensors, getasensor } from "@/actions/sensor.action"
import { regionsname, sensorsTagnames } from "@/constants"

import { useToast } from '@/components/ui/use-toast'



const ComboboxDemo = () => {
    interface SensorRegion {
        [regionName: string]: {
            workingStatuse: boolean;
            // Add other properties as needed
        };
    }
    const { toast } = useToast()
    const [open, setOpen] = React.useState(false)
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [value1, setValue1] = React.useState("")
    const [value2, setValue2] = React.useState("")
    interface regionsensors {
        _id: string;
        Tagnames: string;
        weight:Number
    }

    const [regionsensors, setRegionsensors] = React.useState<regionsensors[]>([]);
    const [sensor, setSensor] = React.useState([]);
    const [sensorregions, setsensorregions] = React.useState<SensorRegion>({});
    const [selsectedregions, setselsectedregions] = React.useState<SensorRegion>({});

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



    return (
        <div>
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









        </div>
    )
}
export default ComboboxDemo
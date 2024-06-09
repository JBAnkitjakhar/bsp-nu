// "use client";

// import * as React from "react";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { getRegionsensors, getallregions } from "@/actions/region.action";
// import {
//   addSensorToRegions,
//   deleteSensorFromRegions,
//   getallsensors,
//   getasensor,
// } from "@/actions/sensor.action";
// import { regionsname, sensorsTagnames } from "@/constants";

// import { useToast } from "@/components/ui/use-toast";

// const ComboboxDemo = () => {
//   interface SensorRegion {
//     [regionName: string]: {
//       workingStatuse: boolean;
//       // Add other properties as needed
//     };
//   }
//   const { toast } = useToast();
//   const [open, setOpen] = React.useState(false);
//   const [open1, setOpen1] = React.useState(false);
//   const [open2, setOpen2] = React.useState(false);
//   const [value, setValue] = React.useState("");
//   const [value1, setValue1] = React.useState("");
//   const [value2, setValue2] = React.useState("");
//   interface regionsensors {
//     _id: string;
//     Tagnames: string;
//   }

//   const [regionsensors, setRegionsensors] = React.useState<regionsensors[]>([]);
//   interface ISensor {
//     _id: string;
//     Sensor_ID: string;
//     Tagnames: string;
//     weight: number;
//     regions: SensorRegion; // Reference the SensorRegion interface
//     __v: number;
//   }
//   const [sensor, setSensor] = React.useState<ISensor>();
//   const [sensorregions, setsensorregions] = React.useState<SensorRegion>({});
//   const [selsectedregions, setselsectedregions] = React.useState<SensorRegion>(
//     {}
//   );

//   const sensors = sensorsTagnames;
//   const regions = regionsname;

//   React.useEffect(() => {
//     // console.log(regionsensors);
//     const fun = async () => {
//       await getRegionsensors(value).then((res) => {
//         // console.log(res);
//         if (res) {
//           const data = JSON.parse(res);
//           console.log(data);
//           setRegionsensors(data);
//         }
//       });
//     };
//     fun();
//   }, [value]);

//   React.useEffect(() => {
//     const fun = async () => {
//       await getasensor(value2).then((res) => {
//         console.log(res);
//         if (res) {
//           const data = JSON.parse(res);
//           console.log(data);
//           // setSensor(data)
//           setsensorregions(data?.regions);
//           setselsectedregions({});
//         }
//       });
//     };
//     fun();
//   }, [value2]);
//   React.useEffect(() => {
//     // console.log(regionsensors);
//     const fun = async () => {
//       await getasensor(value1).then((res) => {
//         console.log(res);
//         if (res) {
//           const data = JSON.parse(res);
//           console.log(data);
//           setSensor(data);
//           setsensorregions(data?.regions);
//           setselsectedregions({});
//         }
//       });
//     };
//     fun();
//   }, [value1]);

//   return (
//     <div className="flex flex-col   items-left">
//       <div className="flex flex-col items-center gap-1">
//         <span className="text-bold">Select by region : </span>
        

//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={open}
//               className="w-[200px] justify-between"
//             >
//               {value
//                 ? regions.find((region) => region.regionName === value)
//                     ?.regionName
//                 : "regions..."}
//               <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-[200px] p-0">
//             <Command>
//               <CommandInput placeholder="Search Region..." className="h-9" />
//               <CommandList>
//                 <CommandEmpty>No Region found.</CommandEmpty>
//                 <CommandGroup>
//                   {regions.map((region) => (
//                     <CommandItem
//                       key={region.regionName}
//                       value={region.regionName}
//                       onSelect={async (currentValue) => {
//                         setValue(currentValue === value ? "" : currentValue);
//                         setOpen(false);
//                       }}
//                     >
//                       {region.regionName}
//                       <CheckIcon
//                         className={cn(
//                           "ml-auto h-4 w-4",
//                           value === region.regionName
//                             ? "opacity-100"
//                             : "opacity-0"
//                         )}
//                       />
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>

//       {regionsensors.length > 0 && (
//         <div className="flex flex-row items-center gap-6 m-2">
//           <h1>Select sensor from region:</h1>
//           <Popover open={open2} onOpenChange={setOpen2}>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 role="combobox"
//                 aria-expanded={open2}
//                 className="w-[200px] justify-between"
//               >
//                 {value
//                   ? regionsensors.find((sensor) => sensor.Tagnames === value2)
//                       ?.Tagnames
//                   : "  region..."}
//                 <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-[200px] p-0">
//               <Command>
//                 <CommandInput placeholder="Search Sensor..." className="h-9" />
//                 <CommandList>
//                   <CommandEmpty>No Sensor found.</CommandEmpty>
//                   <CommandGroup>
//                     {regionsensors.map((sensor, index) => (
//                       <CommandItem
//                         key={index}
//                         value={sensor.Tagnames}
//                         onSelect={async (currentValue) => {
//                           // hendleSelectregion();
//                           setValue2(
//                             currentValue === value2 ? "" : currentValue
//                           );
//                           setOpen2(false);
//                         }}
//                       >
//                         {sensor.Tagnames}
//                         <CheckIcon
//                           className={cn(
//                             "ml-auto h-4 w-4",
//                             value === sensor.Tagnames
//                               ? "opacity-100"
//                               : "opacity-0"
//                           )}
//                         />
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//         </div>
//       )}

//       <div className="flex flex-row items-center m-2 gap-6">
//         <h1>Select by sensor tagname : </h1>
//         <Popover open={open1} onOpenChange={setOpen1}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={open1}
//               className="w-[200px] justify-between"
//             >
//               {value1
//                 ? sensors.find((sensor) => sensor.Tagnames === value1)?.Tagnames
//                 : " sensors..."}
//               <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-[200px] p-0">
//             <Command>
//               <CommandInput placeholder="Search Sensor..." className="h-9" />
//               <CommandList>
//                 <CommandEmpty>No Sensor found.</CommandEmpty>
//                 <CommandGroup>
//                   {sensors.map((sensor, index) => (
//                     <CommandItem
//                       key={index}
//                       value={sensor.Tagnames}
//                       onSelect={(currentValue) => {
//                         setValue1(currentValue === value1 ? "" : currentValue);
//                         setOpen1(false);
//                       }}
//                     >
//                       {sensor.Tagnames}
//                       <CheckIcon
//                         className={cn(
//                           "ml-auto h-4 w-4",
//                           value === sensor.Tagnames
//                             ? "opacity-100"
//                             : "opacity-0"
//                         )}
//                       />
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>
//       <div className="flex flex-row items-center gap-2">
//   <h1 >Selected</h1>
//   <h1 >List:</h1>
//   <div className="w-full">
//     <table className="table-auto w-full  rounded-lg  ">
//       <thead>
//         <tr className="bg-gray-400 text-left text-sm font-medium">
//           <th className="px-4 py-2">Sr. No.</th>
//           <th className="px-4 py-2">Region Name</th>
//           <th className="px-4 py-2">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {selsectedregions && // Check if regions exist before accessing
//           Object.entries(selsectedregions).map(
//             ([regionName], index) =>
//               selsectedregions[`${regionName}`].workingStatuse && (
//                 <tr key={regionName} className="border-b border-gray-800">
//                   <td className="px-4 py-2">{index + 1}</td>
//                   <td className="px-4 py-2">{regionName}</td>
//                   <td className="px-4 py-2">
//                     <Button
//                       onClick={() => {
//                         console.log(regionName);
//                         setsensorregions((prevSensorRegions) => {
//                           const updatedSensorRegions = {
//                             ...prevSensorRegions,
//                           };
//                           if (updatedSensorRegions[regionName]) {
//                             updatedSensorRegions[
//                               regionName
//                             ].workingStatuse = false;
//                           }
//                           return updatedSensorRegions;
//                         });
//                         setselsectedregions((prevSelectedRegions) => ({
//                           ...prevSelectedRegions,
//                           [regionName]: { workingStatuse: false }, // Copy region data from sensorRegions
//                         }));
//                       }}
//                     >
//                       Remove from list
//                     </Button>
//                   </td>
//                 </tr>
//               )
//           )}
//       </tbody>
//     </table>
//   </div>
// </div>

//       <div className="flex flex-row items-center gap-2 m-2">
//         <h1>select    </h1>
//         <h1>the</h1>
//         <h1>regions:</h1>
//         <table className="table-auto w-full border border-gray-800 rounded-md">
//           <thead>
//             <tr className="bg-gray-400 text-left text-sm font-medium">
//               <th className="px-4 py-2">Sr. No.</th>
//               <th className="px-4 py-2">Region Name</th>
//               <th className="px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sensorregions && // Check if regions exist before accessing
//               Object.entries(sensorregions).map(
//                 ([regionName], index) =>
//                   !sensorregions[`${regionName}`].workingStatuse && (
//                     <tr key={regionName} className="border-b border-gray-800">
//                       <td className="px-4 py-2">{index + 1}</td>
//                       <td className="px-4 py-2">{regionName}</td>
//                       <td className="px-4 py-2">
//                         <Button
//                           onClick={() => {
//                             console.log(regionName);
//                             setsensorregions((prevSensorRegions) => {
//                               const updatedSensorRegions = {
//                                 ...prevSensorRegions,
//                               };
//                               if (updatedSensorRegions[regionName]) {
//                                 updatedSensorRegions[
//                                   regionName
//                                 ].workingStatuse = true;
//                               }
//                               return updatedSensorRegions;
//                             });
//                             setselsectedregions((prevSelectedRegions) => ({
//                               ...prevSelectedRegions,
//                               [regionName]: sensorregions[regionName], // Copy region data from sensorRegions
//                             }));
//                           }}
//                         >
//                           Add to region
//                         </Button>
//                       </td>
//                     </tr>
//                   )
//               )}
//           </tbody>
//         </table>
//       </div>
//       <Button
//         className="m-2"
//         onClick={async () => {
//           if (sensor) {
//             await addSensorToRegions(sensor.Tagnames, sensorregions).then(
//               (res) => {
//                 console.log(res);
//                 toast({
//                   description: res.message,
//                 });
//                 setselsectedregions({});
//               }
//             );
//           }
//         }}
//       >
//         Apply changes
//       </Button>
//     </div>
//   );
// };
// export default ComboboxDemo;





















































































"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getRegionsensors, getallregions } from "@/actions/region.action";
import {
  addSensorToRegions,
  deleteSensorFromRegions,
  getallsensors,
  getasensor,
} from "@/actions/sensor.action";
import { regionsname, sensorsTagnames } from "@/constants";
import { useToast } from "@/components/ui/use-toast";

const ComboboxDemo = () => {
  interface SensorRegion {
    [regionName: string]: {
      workingStatuse: boolean;
      // Add other properties as needed
    };
  }
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
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
  const [sensorregions, setsensorregions] = React.useState<SensorRegion>({});
  const [selsectedregions, setselsectedregions] = React.useState<SensorRegion>(
    {}
  );

  const sensors = sensorsTagnames;
  const regions = regionsname;

  React.useEffect(() => {
    const fun = async () => {
      await getRegionsensors(value).then((res) => {
        if (res) {
          const data = JSON.parse(res);
          console.log(data);
          setRegionsensors(data);
        }
      });
    };
    fun();
  }, [value]);

  React.useEffect(() => {
    const fun = async () => {
      await getasensor(value2).then((res) => {
        console.log(res);
        if (res) {
          const data = JSON.parse(res);
          console.log(data);
          setsensorregions(data?.regions);
          setselsectedregions({});
        }
      });
    };
    fun();
  }, [value2]);

  React.useEffect(() => {
    const fun = async () => {
      await getasensor(value1).then((res) => {
        console.log(res);
        if (res) {
          const data = JSON.parse(res);
          console.log(data);
          setSensor(data);
          setsensorregions(data?.regions);
          setselsectedregions({});
        }
      });
    };
    fun();
  }, [value1]);

  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="flex flex-col gap-4 w-full max-w-3xl overflow-auto">
        <div className="flex flex-col items-start gap-1">
          <span className="">Select by region:</span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? regions.find((region) => region.regionName === value)
                      ?.regionName
                  : "regions..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Region..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No Region found.</CommandEmpty>
                  <CommandGroup>
                    {regions.map((region) => (
                      <CommandItem
                        key={region.regionName}
                        value={region.regionName}
                        onSelect={async (currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {region.regionName}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === region.regionName
                              ? "opacity-100"
                              : "opacity-0"
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

        {regionsensors.length > 0 && (
          <div className="flex flex-col items-start gap-1">
            <h1>Select sensor from region:</h1>
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open2}
                  className="w-[200px] justify-between overflow-hidden"
                >
                  {value2
                    ? regionsensors.find((sensor) => sensor.Tagnames === value2)
                        ?.Tagnames
                    : "  region..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search Sensor..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No Sensor found.</CommandEmpty>
                    <CommandGroup>
                      {regionsensors.map((sensor, index) => (
                        <CommandItem
                          key={index}
                          value={sensor.Tagnames}
                          onSelect={async (currentValue) => {
                            setValue2(
                              currentValue === value2 ? "" : currentValue
                            );
                            setOpen2(false);
                          }}
                        >
                          {sensor.Tagnames}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === sensor.Tagnames
                                ? "opacity-100"
                                : "opacity-0"
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
        )}

        <div className="flex flex-col items-start gap-1">
          <h1>Select by sensor tagname:</h1>
          <Popover open={open1} onOpenChange={setOpen1}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open1}
                className="w-[200px] justify-between overflow-hidden"
              >
                {value1
                  ? sensors.find((sensor) => sensor.Tagnames === value1)
                      ?.Tagnames
                  : "sensors..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Sensor..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No Sensor found.</CommandEmpty>
                  <CommandGroup>
                    {sensors.map((sensor, index) => (
                      <CommandItem
                        key={index}
                        value={sensor.Tagnames}
                        onSelect={(currentValue) => {
                          setValue1(currentValue === value1 ? "" : currentValue);
                          setOpen1(false);
                        }}
                      >
                        {sensor.Tagnames}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === sensor.Tagnames
                              ? "opacity-100"
                              : "opacity-0"
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

        <div className="flex flex-col items-start gap-1 w-full">
          <h1>Selected List:</h1>
          <table className="table-auto w-full rounded-lg border">
            <thead>
              <tr className="bg-gray-400 text-left text-sm font-medium">
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Region Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {selsectedregions && // Check if regions exist before accessing
                Object.entries(selsectedregions).map(
                  ([regionName], index) =>
                    selsectedregions[`${regionName}`].workingStatuse && (
                      <tr key={regionName} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{regionName}</td>
                        <td className="px-4 py-2">
                          <Button
                            onClick={() => {
                              console.log(regionName);
                              setsensorregions((prevSensorRegions) => {
                                const updatedSensorRegions = {
                                  ...prevSensorRegions,
                                };
                                if (updatedSensorRegions[regionName]) {
                                  updatedSensorRegions[
                                    regionName
                                  ].workingStatuse = false;
                                }
                                return updatedSensorRegions;
                              });
                              setselsectedregions((prevSelectedRegions) => ({
                                ...prevSelectedRegions,
                                [regionName]: { workingStatuse: false }, // Copy region data from sensorRegions
                              }));
                            }}
                          >
                            Remove from list
                          </Button>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-start gap-1 w-full">
          <h1>Select the regions:</h1>
          <table className="table-auto w-full rounded-lg border">
            <thead>
              <tr className="bg-gray-400 text-left text-sm font-medium">
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Region Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {sensorregions && // Check if regions exist before accessing
                Object.entries(sensorregions).map(
                  ([regionName], index) =>
                    !sensorregions[`${regionName}`].workingStatuse && (
                      <tr key={regionName} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{regionName}</td>
                        <td className="px-4 py-2">
                          <Button
                            onClick={() => {
                              console.log(regionName);
                              setsensorregions((prevSensorRegions) => {
                                const updatedSensorRegions = {
                                  ...prevSensorRegions,
                                };
                                if (updatedSensorRegions[regionName]) {
                                  updatedSensorRegions[
                                    regionName
                                  ].workingStatuse = true;
                                }
                                return updatedSensorRegions;
                              });
                              setselsectedregions((prevSelectedRegions) => ({
                                ...prevSelectedRegions,
                                [regionName]: sensorregions[regionName], // Copy region data from sensorRegions
                              }));
                            }}
                          >
                            Add to region
                          </Button>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>

        <Button
          className="self-start"
          onClick={async () => {
            if (sensor) {
              await addSensorToRegions(sensor.Tagnames, sensorregions).then(
                (res) => {
                  console.log(res);
                  toast({
                    description: res.message,
                  });
                  setselsectedregions({});
                }
              );
            }
          }}
        >
          Apply changes
        </Button>
      </div>
    </div>
  );
};

export default ComboboxDemo;

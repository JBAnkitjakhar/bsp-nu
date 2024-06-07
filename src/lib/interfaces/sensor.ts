export interface ISensor extends Document {
    Sensor_ID: string;
    Tagnames: string;
    weight: number;
    regions:[
        {
            regionName: string;
            workingStatuses:boolean

        }
    ]
}
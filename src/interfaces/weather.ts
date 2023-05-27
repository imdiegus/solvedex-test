export interface weatherInterface{
    clouds:{all:number}
    main:{
        feels_like:number
        humidity:number
        pressure:number
        temp:number
        temp_max:number
        temp_main:number
    }
    weather:{
        description:string
        main:weatherMain
    }[]
    name:string
    wind:{
        speed:string
    }
}

export type weatherMain='Thunderstorm'|'Drizzle'|'Rain'|'Snow'|'Clear'|'Clouds'
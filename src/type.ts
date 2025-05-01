export interface shapeInterface{
    id:number,
    shape:string,
    cord:{
        x:number[],
        y:number[],
    },
    range:{
        outer:{
            x:number[],
            y:number[],
        },
        inner:{
            x:number[],
            y:number[],
        }
    }
}

export interface elementInterface{
    id:number,
    x1:number,
    x2:number,
    y1:number,
    y2:number,
    roughElement:any,
    type:"rectangle"|"line",
    color:string
}
export interface penInterface{
    id:number,
    points:any[],
    roughElement:any,
    color:string
}

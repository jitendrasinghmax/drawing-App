import { elementInterface } from "../type";

export const drawElement=(roughCanvas:any,element:elementInterface)=>{
        const {type,roughElement}=element;
        if(type==="line"||type==="rectangle")roughCanvas.draw(roughElement);
}
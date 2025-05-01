import rough from 'roughjs'
const generator=rough.generator()
export const createElement=(id:number,x1:number,y1:number,x2:number,y2:number,type:"line"|"rectangle",color:"black"|"blue"|"red"|"green")=>{
        
        if(type==='rectangle'){
            const roughElement= generator.rectangle(x1, y1,x2-x1, y2-y1,{stroke:color});
            return {id,x1,y1,x2,y2,type,roughElement,color:"red"}
        }
        else {
            const roughElement= generator.line(x1, y1,x2, y2,{stroke:color});
            return {id,x1,y1,x2,y2,type,roughElement,color}
        }
    }
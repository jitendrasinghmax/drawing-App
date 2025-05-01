export const cursorForPosition=(position:any)=>{
    switch(position){
        case "tl":
        case "br":
        case "start":
        case "end":
            return "nwse-resize"
        case "tr":
        case "bl":
            return "nesw-resize"
        case "inside":
            return "move"  
        default:
            return "default"
    }
}
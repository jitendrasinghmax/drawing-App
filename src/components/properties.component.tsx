import { useRecoilState } from "recoil"
import { colorAtom } from "../store/recoil"

export const Properties=()=>{
    const [color,setColor]=useRecoilState(colorAtom);
    return (<>
    <div className="flex flex-col gap-3">
        <div onClick={()=>setColor("black")}
            style={{border:color==="black"?"4px solid gray":""}} 
            className="h-5 w-5 rounded-md bg-black"></div>
        <div onClick={()=>setColor("red")}
            style={{border:color==="red"?"4px solid gray":""}} 
            className="h-5 w-5 rounded-md bg-red-500"></div>
        <div onClick={()=>setColor("blue")}
            style={{border:color==="blue"?"4px solid gray":""}} 
            className="h-5 w-5 rounded-md bg-blue-500"></div>
        <div onClick={()=>setColor("green")}
            style={{border:color==="green"?"4px solid gray":""}} 
            className="h-5 w-5 rounded-md bg-green-500"></div>
    </div>
    </>)
}
import { MdOutlinePhotoSizeSelectSmall } from "react-icons/md";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { PiRectangleLight } from "react-icons/pi";
import { FaPaintbrush } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { toolsAtom } from "../store/recoil";

export const ToolsComponent = () => {
    const [tool,setTool]=useRecoilState(toolsAtom)
    return (<>
        <div className="w-64 mx-auto flex justify-evenly items-center border-2 border-blue-100 rounded-lg h-10">
            <div style={{backgroundColor:tool==="selection"?"#e6f5ed":""}}
                className="h-7 w-10 text-lg border-2 border-blue-100 flex justify-center items-center rounded-md cursor-pointer"
                 onClick={()=>setTool("selection")}><MdOutlinePhotoSizeSelectSmall/></div>
            <div style={{backgroundColor:tool==="line"?"#e6f5ed":""}}
                 className="h-7 w-10 text-lg border-2 border-blue-100 flex justify-center items-center rounded-md cursor-pointer" 
                onClick={()=>setTool("line")}><TfiLayoutLineSolid/></div>
            <div style={{backgroundColor:tool==="rectangle"?"#e6f5ed":""}}
                className="h-7 w-10 text-lg border-2 border-blue-100 flex justify-center items-center rounded-md cursor-pointer"
                 onClick={()=>setTool("rectangle")}><PiRectangleLight/></div>
            <div style={{backgroundColor:tool==="pencil"?"#e6f5ed":""}}
                className="h-7 w-10 text-lg border-2 border-blue-100 flex justify-center items-center rounded-md cursor-pointer"
                 onClick={()=>setTool("pencil")}
                ><FaPaintbrush/></div>
        </div>
    </>)
}
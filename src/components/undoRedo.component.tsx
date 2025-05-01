import { GrUndo } from "react-icons/gr";
import { LuRedo2 } from "react-icons/lu";

export const UndoRedoComponent=({undo,redo}:{undo:()=>void,redo:()=>void})=>{
    
    return (<>
    <div className="h-fit w-fit flex justify-evenly items-center">
        <div
            className="h-8 w-12 border-2 border-blue-300 rounded-lg mx-2 text-blue-400 bg-[#dbeff0] flex justify-center items-center cursor-pointer active:bg-blue-400 active:text-white" 
            onClick={undo}
            ><GrUndo/></div>
        <div
            className="h-8 w-12 border-2 border-blue-300 rounded-lg mx-2 text-blue-400 bg-[#dbeff0] flex justify-center items-center cursor-pointer active:bg-blue-400 active:text-white"             
            onClick={redo}
            ><LuRedo2/></div>
    </div>
    </>)
}
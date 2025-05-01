import { useState } from "react"
import { elementInterface, penInterface } from "../type"

/**
 * Custom hook to manage a history of states with undo/redo functionality.
 *
 * @returns {[elementInterface[] | undefined, (action: elementInterface[] | ((prev: elementInterface[]) => elementInterface[])) => void]}
 * - The first element is the current state from the history at the current index.
 * - The second element is a function to update the state, either by providing a new state
 *   or a function that takes the previous state and returns a new state.
 */

const useHistory = (initialState:elementInterface[]): [elementInterface[], (action: elementInterface[] | ((prev: elementInterface[]) => elementInterface[]),overwrite?:boolean) => void,()=>void,()=>void,penInterface[], (action: penInterface[] | ((prev: penInterface[]) => penInterface[]),overwrite?:boolean) => void] => {
    const [index, setIndex] = useState<number>(0);
    const [history, setHistory] = useState<elementInterface[][]>([[]]);
    const [penHistory,setPenHistory]=useState<penInterface[][]>([[]]);

    
    const setState = (action: elementInterface[] | ((prev: elementInterface[]) => elementInterface[]),overwrite:boolean=false) => {
        const newState=typeof action==="function"?action(history[index]):action;
        console.log(penHistory)
        if(overwrite===true){
            const copy=[...history];
            copy[index]=newState;
            //console.log(copy)
            setHistory(copy)
        }
        else { 
            const updateState=history.slice(0,index+1);
            setHistory([...updateState,newState])
            setIndex((prev)=>prev+1);
            //copy the last state of pen
            const prevPenState=penHistory.slice(0,index+1);
            const lastState=penHistory[index];
            setPenHistory([...prevPenState,lastState])
        }
       
        return
    };
    const setPenState=(action:penInterface[]|((prev:penInterface[])=>penInterface[]),overwrite:boolean=false)=>{
        const newState=typeof action==="function"?action(penHistory[index]):action;
        if(overwrite===true){
            const copy=[...penHistory];
            copy[index]=newState;
            setPenHistory(copy);
        }
        else {
            const updateState=penHistory.slice(0,index+1);
            setPenHistory([...updateState,newState]);
            setIndex((prev)=>prev+1);
            //copy the last state of element
            const prevElementState=history.slice(0,index+1);
            const lastState=prevElementState[index];
            setHistory([...prevElementState,lastState]);
        }
        
    }
    const undo=()=>setIndex((prev)=>prev-   1);
    const redo=()=>index<history.length-1&&setIndex((prev)=>prev+1);
    if(index==0)return [initialState,setState,undo,redo,[],setPenState];
    else return [history[index],setState,undo,redo,penHistory[index],setPenState]
};
export default useHistory;
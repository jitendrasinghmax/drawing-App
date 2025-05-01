import React, { useEffect, useLayoutEffect, useState } from "react"
import rough from 'roughjs'
import useHistory from "./hook/useHistory";
import { createElement } from "./util/createElement";
import { cursorForPosition } from "./util/cursorPointer";
import { positionWithinElement } from "./util/getEleemntAtPosition";
import { adjustElementCordinates } from "./util/adjustCordinates";
import { useRecoilState, useRecoilValue } from "recoil";
import { actionAtom, colorAtom, toolsAtom } from "./store/recoil";
import { ToolsComponent } from "./components/tool.component";
import { UndoRedoComponent } from "./components/undoRedo.component";
import { drawElement } from "./util/drawElement";
import { createPenElement } from "./util/createPenElement";
import { Properties } from "./components/properties.component";



export const DrawingApp = () => {
    const [elements, setElements, undo, redo,penElement, setPenElement] = useHistory([])
    const [action, setAction] = useRecoilState(actionAtom);
    const tool = useRecoilValue(toolsAtom)
    const [selected, SetSelected] = useState<any>(null);
    const color=useRecoilValue(colorAtom);


    const getElementAtPosition = (x: number, y: number) => {
        return elements.map((element) => ({ ...element, position: positionWithinElement(x, y, element) }))
            .find((element) => element.position !== null)
    }

    const updateElement = (id: number, x1: number, y1: number, clientX: number, clientY: number, tool: "line" | "rectangle") => {
        const updatedElement = createElement(id, x1, y1, clientX, clientY, tool,color);
        const copy = [...elements];
        copy[id] = updatedElement;
        setElements(copy, true)
    }
    const updatePenElement=(id:number,x:number,y:number)=>{
        const penAtId=penElement[id];
        const updatedElement=createPenElement(id,x,y,penAtId.points,color)
        const copy=[...penElement];
        copy[id]=updatedElement;
        setPenElement(copy,true);
    }
    const mouseDownHandeler = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = event;
        if (tool === 'selection') {
            const offsetX = clientX;
            const offsetY = clientY;
            const element = getElementAtPosition(clientX, clientY)
            SetSelected({ ...element, offsetX, offsetY })
            if (element?.position === "inside") setAction("moving")
            else setAction("resize")
            return;
        }
        else if (tool === "line" || tool === "rectangle") {
            setAction("drawing");
            const id = elements.length
            const element = createElement(id, clientX, clientY, clientX, clientY, tool,color)
            const newElemwnt = [...elements, element]
            setElements(newElemwnt)
        }
        else if (tool === "pencil") {
            setAction("drawing")
            const id = penElement.length
            const element = createPenElement(id,clientX,clientY, [],color)
            const newElement = [...penElement, element]
            setPenElement(newElement);
        }

    }
    const mouseMoveHandeler = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = event;
        const element = getElementAtPosition(clientX, clientY);
        if (tool === "selection") (event.target as HTMLCanvasElement).style.cursor = cursorForPosition(element?.position);

        if (action === "moving") {
            if (!selected) {
                return;
            }
            const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selected;
            const width = x2 - x1;
            const height = y2 - y1;
            updateElement(id, clientX - (offsetX - x1), clientY - (offsetY - y1), clientX - (offsetX - x1) + width, clientY - (offsetY - y1) + height, type)
            return;
        }
        if (action === "resize") {
            const { id, x1, x2, y1, y2, type, offsetX, offsetY, position } = selected;
            //put the resize functionality in a function    
            if (position === "tl") updateElement(id, x1 + (clientX - offsetX), y1 + (clientY - offsetY), x2, y2, type);
            else if (position === "tr") updateElement(id, x1, y1 + (clientY - offsetY), x2 + (clientX - offsetX), y2, type);
            else if (position === "bl") updateElement(id, x1 + (clientX - offsetX), y1, x2, y2 + (clientY - offsetY), type);
            else if (position === "br") updateElement(id, x1, y1, x2 + (clientX - offsetX), y2 + (clientY - offsetY), type);
            else if (position === "start") updateElement(id, x1 + (clientX - offsetX), y1 + (clientY - offsetY), x2, y2, type);
            else if (position === "end") updateElement(id, x1, y1, x2 + (clientX - offsetX), y2 + (clientY - offsetY), type);
        }
        if (action === "drawing") {
            if (tool === "line" || tool === "rectangle") {
                const index = elements.length - 1;
                const { x1, y1 } = elements[index];
                updateElement(index, x1, y1, clientX, clientY, tool)
            }
            else {
                const index=penElement.length-1;
                const {clientX,clientY}=event;
                updatePenElement(index,clientX,clientY)
            }
        }

    }
    const mouseUpHandeler = () => {
        SetSelected(null)
        setAction(null)
        if(tool==="pencil")return
        const index = elements.length - 1;
        if (action === "drawing" || action === "resize") {
            const element = elements[index];
            const { id, type } = element;
            const { x1, y1, x2, y2 } = adjustElementCordinates(element);
            if (type === "rectangle" || type === "line") {
                updateElement(id, x1, y1, x2, y2, type)
            }
        }

    }
    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height)
        const roughCanvas = rough.canvas(canvas);
        // const rect=generator.rectangle(10,10,100,100);
        // roughCanvas.draw(rect)
        elements.forEach((element) => {
            drawElement(roughCanvas, element)
        })

        // penElement.forEach((element)=>{
        //     roughCanvas.draw(element.roughElement)
        // })
        penElement.forEach((element)=>{
            if (context) {
                context.fillStyle =element.color;
                context.fill(element.roughElement)
            }

        })


    })
    useEffect(() => {

    }, [])
    //console.log(penElement)
    //console.log("current",elements)
    return (<>

        <div>
            <div className="w-full absolute top-3"><ToolsComponent />
            </div>
            <div className="absolute bottom-5 left-3"><UndoRedoComponent undo={undo} redo={redo} /></div>
            {(tool==="line"||tool==="rectangle"||tool==="pencil")&&<div className="absolute top-24 left-6"><Properties/></div>}
            <canvas
                width={window.innerWidth}
                height={window.innerHeight}
                id="canvas"
                onMouseDown={mouseDownHandeler}
                onMouseMove={mouseMoveHandeler}
                onMouseUp={mouseUpHandeler}></canvas>
        </div>
    </>)
}
import getStroke from 'perfect-freehand';
function getSvgPathFromStroke(points: number[][]) {
    if (!points.length) return "";
  
    const d = points.reduce((acc, [x0, y0], i) => {
      acc.push(`${i === 0 ? "M" : "L"} ${x0} ${y0}`);
      return acc;
    }, [] as string[]);
  
    return d.join(" ") + " Z";
  }
export const createPenElement=(id:number,x:number,y:number,points:any[],color:"red"|"blue"|"green"|"black")=>{
    const newPoints=[...points,[x,y]];
    const storkPoints=getStroke(newPoints.map(p => [p[0], p[1]]),{
        size: 4,
        smoothing: 0.35,
        thinning: -0.64,
        streamline: 0.49,
        easing: (t) => t,
        start: {
          taper: 4,
          cap: true,
        },
        end: {
          taper: 0,
          cap: true,
        },
      });
    const roughElement=new Path2D(getSvgPathFromStroke(storkPoints));
    return {id,roughElement,points:newPoints,color}
}
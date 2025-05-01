import { elementInterface } from "../type";

const distance = (point1: { x: number; y: number }, point2: { x: number; y: number }) => {
    const dx = Math.abs(point2.x - point1.x);
    const dy = Math.abs(point2.y - point1.y);
    return Math.sqrt(dx * dx + dy * dy);
};
const nearPoint = (x: number, y: number, x1: number, y1: number, position: "tl" | "tr" | "bl" | "br" | "start" | "end") => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? position : null;
}
export const positionWithinElement = (x: number, y: number, element: elementInterface) => {
    const { type, x1, y1, x2, y2 } = element;
    if (type === "rectangle") {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        const tl = nearPoint(x, y, x1, y1, "tl");
        const tr = nearPoint(x, y, x2, y1, "tr");
        const bl = nearPoint(x, y, x1, y2, "bl");
        const br = nearPoint(x, y, x2, y2, "br");
        const inside = x > minX && x < maxX && y > minY && y < maxY ? "inside" : null;
        return tl || tr || bl || br || br || inside;
    }
    else {
        const a = { x: x1, y: y1 };
        const b = { x: x2, y: y2 };
        const c = { x, y };
        const dist = distance(a, b) - (distance(a, c) + distance(b, c))
        const start = nearPoint(x, y, x1, y1, "start");
        const end = nearPoint(x, y, x2, y2, "end");
        const inside = Math.abs(dist) < 1 ? "inside" : null;
        return start || end || inside;
    }
}

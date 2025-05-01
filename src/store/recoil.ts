import { atom } from "recoil";

export const actionAtom=atom<"moving"|"drawing"|"resize"|null>({
    key:"tools",
    default:null
})

export const toolsAtom=atom<"line"|"rectangle"|"selection"|"pencil"|null>({
    key:"action",
    default:null
})
export const colorAtom=atom<"red"|"blue"|"green"|"black">({
    key:"color",
    default:"black"
})
import { GenerationTask } from "@src/types"
import create from "zustand"

const testData: GenerationTask[] = [
    {
        id: "81",
        prompt: "The Doom marine riding a Yorp into the sunset, trending on Art Station HQ",
    },
    { id: "93", prompt: "Colorado" },
    { id: "110", prompt: "Kansas" },
    { id: "121", prompt: "Minnesota" },
    { id: "132", prompt: "New York" },
    { id: "143", prompt: "Virginia" },
    { id: "164", prompt: "Georgia" },
    { id: "150", prompt: "Florida" },
]

interface MainState {
    queue?: GenerationTask[]
    addToQueue?: (item: GenerationTask) => void
    updateQueue?: (newQueue: GenerationTask[]) => void
    removeFromQueue?: (id: string) => void
}

let getState: () => MainState
let setState: (state: MainState) => void
const useStore = create<MainState>((set, get) => {
    getState = get
    setState = set
    return {
        queue: testData,
        addToQueue: item => {
            set({ queue: [...get().queue, item] })
        },
        updateQueue: newQueue => {
            set({ queue: newQueue })
        },
        removeFromQueue: id => {},
    }
})

export { useStore, getState, setState }

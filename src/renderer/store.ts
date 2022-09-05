import GenerationTask from "@src/generationTask"
import create from "zustand"

const testData: GenerationTask[] = [
    new GenerationTask(
        "The Doom marine riding a Yorp into the sunset, trending on Art Station HQ"
    ),
    new GenerationTask("Colorado"),
    new GenerationTask("Kansas"),
    new GenerationTask("New York"),
    new GenerationTask("Arkansas"),
    new GenerationTask("Utah"),
    new GenerationTask("Texas"),
    new GenerationTask("California"),
]

type MainState = {
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

import GenerationTask, { GTaskStatus } from "@src/generationTask"
import create from "zustand"

const testData: GenerationTask[] = [
    new GenerationTask(
        `"The Doom marine riding a Yorp into the sunset, trending on artstation HQ"`
    ),
]

type MainState = {
    queue?: GenerationTask[]
    selectedTaskId?: string
    getTask?: (id: string) => GenerationTask
    addToQueue?: (item: GenerationTask) => void
    updateQueue?: (newQueue: GenerationTask[]) => void
    removeFromQueue?: (id: string) => void
    updateTask?: (item: GenerationTask) => void
    getRunningTasks?: () => GenerationTask[]
    completedTasks?: GenerationTask[]
    terminalOutputs?: { id: string } | {}
    updateTerminalOutput?: (id: string, newText: string) => void
    getTerminalOutputForTask?: (id: string) => string
}

let getState: () => MainState
let setState: (state: MainState) => void
const useStore = create<MainState>((set, get) => {
    getState = get
    setState = set
    return {
        queue: testData,
        completedTasks: [],
        selectedTaskId: "-1",
        terminalOutputs: {},
        getTask: id => {
            return get().queue.find(item => item.id === id) ?? null
        },
        addToQueue: item => {
            set({ queue: [...get().queue, item] })
        },
        updateQueue: newQueue => {
            set({ queue: newQueue })
        },
        updateTask: item => {
            const index = get().queue.findIndex(
                curItem => curItem.id === item.id
            )
            const newQueue = get().queue.slice()
            newQueue[index] = new GenerationTask()
            newQueue[index].copy({ ...item })
            set({ queue: newQueue })
        },
        removeFromQueue: id => {
            set({ queue: get().queue.filter(item => item.id !== id) })
        },
        getRunningTasks() {
            return get().queue.filter(
                task => task.status === GTaskStatus.RUNNING
            )
        },
        updateTerminalOutput: (id: string, newText: string) => {
            const newFullText = (get().terminalOutputs[id] ?? "") + newText
            set({
                terminalOutputs: {
                    ...get().terminalOutputs,
                    [id]: newFullText.slice(-10000),
                },
            })
        },
        getTerminalOutputForTask: id => {
            return get().terminalOutputs[id]
        },
    }
})

export { useStore, getState, setState }

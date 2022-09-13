import GenerationTask, { GTaskStatus } from "@src/generationTask"
import create from "zustand"

const testData: GenerationTask[] = [
    new GenerationTask(
        `"The Doom marine riding a Yorp into the sunset, trending on artstation HQ"`
    ),
]

const sampleGTaskData = {
    id: "Ixp3LJtaNqXihazXuybYd",
    prompt: '"The Doom marine riding a Yorp into the sunset, trending on artstation HQ"',
    command: "python ~/stable-diffusion/orig_scripts/img2img.py",
    customArgs: "--n_iter 4 --n_samples 2 --ddim_steps 64 --precision full",
    width: 512,
    height: 768,
    seed: 4754,
    initImage: "",
    specialArgs: {
        prompt: {
            enabled: true,
            param: "--prompt ",
        },
        width: {
            enabled: true,
            param: "--W ",
        },
        height: {
            enabled: true,
            param: "--H ",
        },
        seed: {
            enabled: true,
            param: "--seed ",
        },
        initImage: {
            enabled: true,
            param: "--init_img ",
        },
        outputDir: {
            enabled: true,
            param: "--outdir ",
        },
    },
    status: "not_ready",
    canvasData: {
        bgImgObjURL: "",
        paths: [],
    },
    initImgExportPath: "~/generationq/init_images/Ixp3LJtaNqXihazXuybYd.png",
    generatedImagePath: null,
    errorMessage: null,
    terminalOutput: "",
    outputDir: "~/generationq/generated-images",
    outputFile: null,
}
const testGTask = new GenerationTask(sampleGTaskData.prompt)
testGTask.copy(sampleGTaskData)
const testCompletedTasks = [testGTask]

export enum TabNames {
    GENERATION_EDITOR = 0,
    COMPLETED_GENERATIONS = 1,
    GALLERY = 2,
}

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
    activeTab?: number
}

let getState: () => MainState
let setState: (state: MainState) => void
const useStore = create<MainState>((set, get) => {
    getState = get
    setState = set
    return {
        queue: testData,
        completedTasks: testCompletedTasks,
        selectedTaskId: "-1",
        terminalOutputs: {},
        activeTab: TabNames.COMPLETED_GENERATIONS,
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

import { nanoid } from "nanoid"

export type GTaskResult = {
    success: boolean
    outputPath: string
    errorMessage: string
}

export enum GTaskStatus {
    NOT_READY = "not_ready",
    READY = "ready",
    RUNNING = "running",
    COMPLETED = "completed",
    ERROR = "error",
    GALLERY = "gallery",
}

export default class GenerationTask {
    id: string
    command: string
    prompt: string
    width: number
    height: number
    seed: number
    initImage: string
    specialArgs: Record<string, { enabled: boolean; param: string }>
    status: string
    canvasData: { bgImgObjURL: string; paths: Record<string, unknown>[] }
    initImgExportPath: string
    customArgs: string
    generatedImagePath: string | null
    errorMessage: string | null

    constructor(prompt?: string) {
        this.id = nanoid()
        this.prompt = prompt ?? ""
        this.command = ""
        this.customArgs = ""
        this.width = 512
        this.height = 512
        this.seed = Math.floor(Math.random() * 10000)
        this.initImage = ""
        this.specialArgs = {
            prompt: { enabled: true, param: "--prompt " },
            width: { enabled: true, param: "--W " },
            height: { enabled: true, param: "--H " },
            seed: { enabled: true, param: "--seed " },
            initImage: { enabled: false, param: "--init_img " },
        }
        this.status = GTaskStatus.NOT_READY
        this.canvasData = { bgImgObjURL: "", paths: [] }
        this.initImgExportPath = ""
        this.command = ""
        this.customArgs = ""
        this.generatedImagePath = null
        this.errorMessage = null
    }

    copy(gTask: GenerationTask) {
        Object.entries(gTask).forEach(([key, val]) => (this[key] = val))
    }

    getGeneratedArgs(): string {
        const argString = Object.entries(this.specialArgs).reduce(
            (
                result: string,
                [key, curArg]: [string, { enabled: boolean; param: string }]
            ) => {
                const value =
                    key === "initImage" ? this.initImgExportPath : this[key]
                return (
                    result +
                    (curArg.enabled ? `${curArg.param}${value}` + " " : "")
                )
            },
            ""
        )

        return argString
    }
}

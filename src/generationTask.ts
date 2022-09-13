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
    terminalOutput: string

    // The idea behind these two is: outputDir would be used for
    // periodically scanning a location, looking for a new image file
    // to be added; outputPath would be the exact path to the image file,
    // only discoverable once that file is actually generated. Clearly there
    // are limitations to this approach, but I haven't thought of another
    // which wouldn't sacrifice generality (as far as which specific generation
    // programs this can be used with).
    outputDir: string
    outputFile: string | null

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
            outputDir: { enabled: true, param: "--outdir " },
        }
        this.status = GTaskStatus.NOT_READY
        this.canvasData = { bgImgObjURL: "", paths: [] }
        this.initImgExportPath = "~/generationq/init_images/" + this.id + ".png"
        this.command = ""
        this.customArgs = ""
        this.generatedImagePath = null
        this.errorMessage = null
        this.terminalOutput = ""
        this.outputDir = "~/generationq/generated-images"
        this.outputFile = null
    }

    copy(gTask: Record<string, unknown>) {
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

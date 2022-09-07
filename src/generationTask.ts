import { nanoid } from "nanoid"

export default class GenerationTask {
    id: string
    command: string
    prompt: string
    width: number
    height: number
    seed: number
    initImage: string
    specialArgs: Record<string, { enabled: boolean; param: string }>
    ready: boolean
    canvasData: { bgImgObjURL: string; paths: Record<string, unknown>[] }
    initImgExportPath: string
    customArgs: string

    constructor(prompt: string) {
        this.id = nanoid()
        this.prompt = prompt
        this.command = ""
        this.customArgs = ""
        this.width = 512
        this.height = 512
        this.seed = Math.floor(Math.random() * 10000)
        this.initImage = ""
        this.specialArgs = {
            prompt: { enabled: true, param: "--prompt " },
            width: { enabled: true, param: "--width " },
            height: { enabled: true, param: "--height " },
            seed: { enabled: true, param: "--seed " },
            initImage: { enabled: false, param: "--init_img " },
        }
        this.ready = false
        this.canvasData = { bgImgObjURL: "", paths: [] }
        this.initImgExportPath = ""
        this.command = ""
        this.customArgs = ""
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

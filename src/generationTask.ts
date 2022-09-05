import { nanoid } from "nanoid"

export default class GenerationTask {
    id: string
    command: string
    args: string
    prompt: string
    width: number
    height: number
    seed: number
    initImage: string
    specialArgs: Record<string, { enabled: boolean; param: string }>

    constructor(prompt: string, command: string = "", args: string = "") {
        this.id = nanoid()
        this.prompt = prompt
        this.command = command
        this.args = args
        this.width = 512
        this.height = 512
        this.seed = Math.floor(Math.random() * 10000)
        this.initImage = ""
        this.specialArgs = {
            prompt: { enabled: true, param: "--prompt " },
            width: { enabled: true, param: "--width " },
            height: { enabled: true, param: "--height " },
            seed: { enabled: true, param: "--seed " },
            initImage: { enabled: true, param: "--init_img " },
        }
    }
}

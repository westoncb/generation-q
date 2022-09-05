import { nanoid } from "nanoid"

export default class GenerationTask {
    id: string
    command: string
    args: string
    prompt: string

    constructor(prompt: string, command: string = "", args: string = "") {
        this.id = nanoid()
        this.prompt = prompt
        this.command = command
        this.args = args
    }
}

import { getState, setState } from "./store"
import { GTaskResult, GTaskStatus } from "../generationTask"
import isNil from "lodash.isnil"
import isEmpty from "lodash.isempty"

export function startQueueProcessor() {
    setInterval(queueProcessorTick, 500)
}

async function queueProcessorTick() {
    if (isEmpty(getState().getRunningTasks())) {
        const readyTask = getState().queue.find(
            task => task.status === GTaskStatus.READY
        )
        if (!isNil(readyTask)) {
            executeTask(readyTask)
        }
    }
}

async function executeTask(task) {
    getState().updateTask({ ...task, status: GTaskStatus.RUNNING })

    try {
        const result: GTaskResult =
            // @ts-ignore: electronAPI is on the window
            await window.electronAPI.sendNextGenerationTask(task)

        if (result.success) {
            getState().updateTask({
                ...task,
                status: GTaskStatus.COMPLETED,
                generatedImagePath: result.outputPath,
            })
        } else {
            getState().updateTask({
                ...task,
                status: GTaskStatus.ERROR,
                errorMessage: result.errorMessage,
            })
        }

        getState().removeFromQueue(task.id)
        setState({ completedTasks: [...getState().completedTasks, task] })
    } catch (e) {
        console.log("error!", e)
        getState().updateTask({
            ...task,
            status: GTaskStatus.ERROR,
            errorMessage: e.message,
        })
    }
}

// @ts-ignore: ts doesn't recognize window.electronAPI
window.electronAPI.handleGenerationTaskProgress((event, info) => {
    console.log("got update!", info)
})

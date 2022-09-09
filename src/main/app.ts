import { app, BrowserWindow, ipcMain } from "electron"
import { createAppWindow } from "./appWindow"

/** Handle creating/removing shortcuts on Windows when installing/uninstalling. */
if (require("electron-squirrel-startup")) {
    app.quit()
}

function wait(time) {
    return new Promise((resolve: (unknown?) => void) =>
        setInterval(() => resolve(), time)
    )
}
const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function generateString(length) {
    let result = " "
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }

    return result
}

function getTermOut() {
    return generateString(Math.floor(Math.random() * 5000 + 50))
}

async function handleNextGenerationTask(event, task) {
    await new Promise(async (resolve, reject) => {
        for (let i = 0; i < 500; i++) {
            await wait(100)
            sendProgress({ taskId: task.id, terminalOutput: getTermOut() })
        }
        resolve(null)
    })
    // throw new Error("well there was a problem")
    return "this the result"
}

let appWindow
function sendProgress(info) {
    appWindow?.webContents.send("generation-task-progress", info)
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.whenReady().then(() => {
    ipcMain.handle("nextGenerationTask", handleNextGenerationTask)

    appWindow = createAppWindow()

    /**
     * Emitted when the application is activated. Various actions can
     * trigger this event, such as launching the application for the first time,
     * attempting to re-launch the application when it's already running,
     * or clicking on the application's dock or taskbar icon.
     */
    app.on("activate", () => {
        /**
         * On OS X it's common to re-create a window in the app when the
         * dock icon is clicked and there are no other windows open.
         */
        if (BrowserWindow.getAllWindows().length === 0) {
            createAppWindow()
        }
    })
})

/**
 * Emitted when all windows have been closed.
 */
app.on("window-all-closed", () => {
    /**
     * On OS X it is common for applications and their menu bar
     * to stay active until the user quits explicitly with Cmd + Q
     */
    if (process.platform !== "darwin") {
        app.quit()
    }
})

/**
 * In this file you can include the rest of your app's specific main process code.
 * You can also put them in separate files and import them here.
 */

import { app, BrowserWindow } from "electron"
import path from "path"

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string

let appWindow: BrowserWindow

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
    // Create new window instance
    appWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        backgroundColor: "#1f252c",
        show: false,
        autoHideMenuBar: true,
        icon: path.resolve("assets/images/appIcon.ico"),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false,

            // It seems like this might be needed by Electron Forge,
            // but we need a custom preload script too, so not sure
            // how both can be present and haven't spotted any
            // issues doing it this way so far
            // preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
            preload: path.join(__dirname, "../../src/preload.js"),
        },
    })

    // Load the index.html of the app window.
    appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY)

    // Show window when its ready to
    appWindow.on("ready-to-show", () => appWindow.show())

    // Close all windows when main window is closed
    appWindow.on("close", () => {
        appWindow = null
        app.quit()
    })

    return appWindow
}

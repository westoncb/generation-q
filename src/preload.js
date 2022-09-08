const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
    sendNextGenerationTask: task =>
        ipcRenderer.invoke("nextGenerationTask", task),
    handleGenerationTaskProgress: callback =>
        ipcRenderer.on("generation-task-progress", callback),
})

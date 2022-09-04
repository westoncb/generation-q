import React from "react"
import { createRoot } from "react-dom/client"
import Application from "./components/Application"

// Render application in DOM
createRoot(document.getElementById("app-root")).render(<Application />)

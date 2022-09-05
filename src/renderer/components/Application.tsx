import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import React, { useEffect, useState } from "react"
import StatusRegion from "./StatusRegion"
import Queue from "./Queue"
import "../style.scss"
import { Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useStore } from "../store"
import GenerationEditor from "./GenerationEditor"
import GenerationTask from "@src/generationTask"

const GENERATION_EDITOR = 0
const COMPLETED_GENERATIONS = 1
const GALLERY = 2

export default function Application() {
    const { queue, addToQueue } = useStore()
    const [selectedTask, setSelectedTask] = useState(null)
    const [tabIndex, setTabIndex] = useState(GENERATION_EDITOR)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue)
    }

    return (
        <div className="application">
            <div className="everything-above-status">
                <div className="main-left-column">
                    <Button
                        className="primary-button"
                        sx={{ margin: "0.5rem" }}
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={e => {
                            const newTask = new GenerationTask("")
                            setSelectedTask(newTask)
                            addToQueue(newTask)
                        }}
                    >
                        New Generation
                    </Button>
                    <Queue items={queue} />
                </div>
                <div className="main-area">
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                aria-label="basic tabs example"
                            >
                                <Tab
                                    label="Generation Editor"
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    label="Completed Generations"
                                    {...a11yProps(1)}
                                />
                                <Tab label="Gallery" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={tabIndex} index={GENERATION_EDITOR}>
                            <GenerationEditor gTask={selectedTask} />
                        </TabPanel>
                        <TabPanel
                            value={tabIndex}
                            index={COMPLETED_GENERATIONS}
                        >
                            Item Two
                        </TabPanel>
                        <TabPanel value={tabIndex} index={GALLERY}>
                            Item Three
                        </TabPanel>
                    </Box>
                </div>
            </div>
            <StatusRegion />
        </div>
    )
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            className="tab-panel"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

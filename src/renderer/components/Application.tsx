import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import React, { useState } from "react"
import StatusRegion from "./StatusRegion"
import Queue from "./Queue"
import "../style.scss"
import { Badge, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { setState, getState, useStore, TabNames } from "../store"
import GenerationEditor from "./GenerationEditor"
import GenerationTask from "@src/generationTask"
import shallow from "zustand/shallow"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { GTaskStatus } from "@src/generationTask"
import { DoneOutline, FmdBad, PsychologyAlt } from "@mui/icons-material"
import { startQueueProcessor } from "../queueProcessor"
import gear from "@assets/images/gear.svg"
import isEmpty from "lodash.isempty"

const theme = createTheme({
    palette: {
        primary: { main: "#7a87cc" },
        success: { main: "#70d381" },
    },
})

startQueueProcessor()

export default function Application() {
    const { queue, selectedTaskId, completedTasks, activeTab } = useStore(
        state => ({
            queue: state.queue,
            selectedTaskId: state.selectedTaskId,
            completedTasks: state.completedTasks,
            activeTab: state.activeTab,
        }),
        shallow
    )

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setState({ activeTab: newValue })
    }

    return (
        <ThemeProvider theme={theme}>
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
                                setState({ selectedTaskId: newTask.id })
                                getState().addToQueue(newTask)
                            }}
                        >
                            New Generation
                        </Button>
                        <Queue tasks={queue} />
                    </div>
                    <div className="main-area">
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                aria-label="basic tabs example"
                            >
                                <Tab
                                    label="Generation Editor"
                                    {...a11yProps(0)}
                                />

                                <Tab
                                    label={
                                        <Badge
                                            color="success"
                                            badgeContent={
                                                !isEmpty(completedTasks)
                                                    ? completedTasks.length
                                                    : null
                                            }
                                        >
                                            Completed Generations
                                        </Badge>
                                    }
                                    {...a11yProps(1)}
                                />
                                <Tab label="Gallery" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel
                            value={activeTab}
                            index={TabNames.GENERATION_EDITOR}
                        >
                            <GenerationEditor
                                gTask={getState().getTask(selectedTaskId)}
                            />
                        </TabPanel>
                        <TabPanel
                            value={activeTab}
                            index={TabNames.COMPLETED_GENERATIONS}
                        ></TabPanel>
                        <TabPanel
                            value={activeTab}
                            index={TabNames.GALLERY}
                        ></TabPanel>
                    </div>
                </div>
                <StatusRegion />
            </div>
        </ThemeProvider>
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

export function statusIconForGtask(status, styles) {
    const additionalStyles = {
        display: "inline-block",
        fill: "currentColor",
    }
    switch (status) {
        case GTaskStatus.NOT_READY:
            return <FmdBad style={{ ...additionalStyles, ...styles }} />
        case GTaskStatus.READY:
            return <DoneOutline style={{ ...additionalStyles, ...styles }} />
        case GTaskStatus.RUNNING:
            return <img src={gear} style={{ ...additionalStyles, ...styles }} />
        default:
            return <PsychologyAlt style={{ ...additionalStyles, ...styles }} />
    }
}
